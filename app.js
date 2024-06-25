const TILE_SIZE = 16; // width of each square tile in pixels


(async () =>
{
    const map = {
        width: 20,
        height: 10,
        tiles: [
            [{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:4,y:10},{x:2,y:7},{x:4,y:8},{x:3,y:7},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:2,y:7},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:3,y:7},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:2,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:3,y:7},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:4,y:10},{x:2,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:4,y:8},{x:3,y:8},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10},{x:4,y:10}],
            [{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0},{x:1,y:0}],
            [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}],
        ]
    }
    const sky = {
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
    for (let y=0; y<map.height; y++) {
        for (let x=0; x<map.width; x++) {
            let tile = map.tiles[y][x]
            let sprite = new PIXI.Sprite(tileTextures[tile.x][tile.y]);
            sprite.x = x*TILE_SIZE;
            sprite.y = y*TILE_SIZE;
            background.addChild(sprite);
        }
    }
    background.scale.x = 4;
    background.scale.y = 4;
    PIXI.TexturePool.textureOptions.scaleMode = 'nearest';
    app.stage.addChild(background);
    })();

async function splitTiles(filename) {
    const tileTextures = await PIXI.Assets.load('./assets/' + filename);
    tileTextures.source.scaleMode = 'nearest'; // keeps scaled textures pixelated (removes blurriness)
    let tiles = [];
    const xMax = tileTextures.width/TILE_SIZE;
    const yMax = tileTextures.height/TILE_SIZE;
    for (let x = 0; x < xMax; x++) {
        let column = [];
        for (let y = 0; y < yMax; y++) {
            const frame = new PIXI.Rectangle(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            let tile = new PIXI.Texture({
                source: tileTextures,
                frame: frame
            }); // loads all tiles and stores all of them into tile variable
            column[y] = tile;
        }
        tiles[x] = column;
    }
    return tiles;
}