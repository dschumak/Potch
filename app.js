const TILE_SIZE = 16; // width of each square tile in pixels


(async () =>
{
    const tileMap = {
        width: 20,
        height: 10,
        tiles: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    }
    const skyMap = {
        width: 20,
        height: 10,
        tiles: [
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74
        ]
    }
    // Create a PixiJS application.
    const app = new PIXI.Application();

    // Intialize the application.
    await app.init({resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    const tileTextures = await splitTiles('nature-platformer-tileset-16x16.png');

    let background = new PIXI.Container();
    let sky = new PIXI.Container();
    populateContainer(tileTextures, tileMap, background);
    populateContainer(tileTextures, skyMap, sky);
    background.scale.x = 4;
    background.scale.y = 4;
    sky.scale.x = 4;
    sky.scale.y = 4;
    app.stage.addChild(sky);
    app.stage.addChild(background);
    })();

async function splitTiles(filename) {
    const tileSet = await PIXI.Assets.load('./assets/' + filename);
    tileSet.source.scaleMode = 'nearest'; // keeps scaled textures pixelated (removes blurriness)
    let tileTextures = [];
    const xMax = tileSet.width/TILE_SIZE;
    const yMax = tileSet.height/TILE_SIZE;
    for (let y = 0; y < yMax; y++) {
        for (let x = 0; x < xMax; x++) {
            const frame = new PIXI.Rectangle(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            let tile = new PIXI.Texture({
                source: tileSet,
                frame: frame
            }); // loads all tiles and stores all of them into tile variable
            tileTextures[y*xMax+x] = tile;
        }
    }
    return tileTextures;
}

async function populateContainer(tileTextures, map, container) {
    for (let y=0; y<map.height; y++) {
        for (let x=0; x<map.width; x++) {
            let tile = map.tiles[y*map.width+x]
            let sprite = new PIXI.Sprite(tileTextures[tile]);
            sprite.x = x*TILE_SIZE;
            sprite.y = y*TILE_SIZE;
            container.addChild(sprite);
        }
    }
}