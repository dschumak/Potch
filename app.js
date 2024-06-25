const TILE_SIZE = 16; // width of each square tile in pixels
const SCALE = 4;
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
            }); // loads all tiles and stores all of them into tile array
            tileTextures[getIndex(x,y,xMax)] = tile;
        }
    }
    return tileTextures;
}

async function splitCharacterFrames(filename, characterWidth, characterHeight) {
    const frameSet = await PIXI.Assets.load('./assets/' + filename);
    frameSet.source.scaleMode = 'nearest';
    let characterFrames = [];
    const xMax = (frameSet.width/TILE_SIZE)/characterWidth;
    const yMax = (frameSet.height/TILE_SIZE)/characterHeight;
    for (let y = 0; y < yMax; y++) {
        for (let x = 0; x < xMax; x++) {
            const frame = new PIXI.Rectangle(x*characterHeight*TILE_SIZE, y*characterHeight*TILE_SIZE, TILE_SIZE*characterWidth, TILE_SIZE*characterHeight);
            let tile = new PIXI.Texture({
                source: frameSet,
                frame: frame
            }); // loads all tiles and stores all of them into tile array
            characterFrames[getIndex(x,y,xMax)] = tile;
        }
    }
    return characterFrames;
}

function populateContainer(tileTextures, map, container) {
    for (let y=0; y<map.height; y++) {
        for (let x=0; x<map.width; x++) {
            let tile = map.tiles[getIndex(x,y,map.width)]
            let sprite = new PIXI.Sprite(tileTextures[tile]);
            sprite.x = x*TILE_SIZE;
            sprite.y = y*TILE_SIZE;
            container.addChild(sprite);
        }
    }
}

function getIndex(x, y, xMax) {
    return y * xMax + x;
}

class Keyboard {
  constructor () {
    this.pressed = {};
  }
  
  watch (el) {
    el.addEventListener('keydown', (e) => {
      this.pressed[e.key] = true;
    });
    el.addEventListener('keyup', (e) => {
      this.pressed[e.key] = false;
    });
  }
}

(async () =>
{
    const tileMap = {
        width: 20,
        height: 10,
        tiles: [
            12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
            51, 52, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
            60, 60, 60, 52, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
            60, 60, 60, 60, 60, 52, 12, 12, 12, 12, 12, 12, 12, 0 , 1 , 1 , 2 , 12, 12, 12, 
            60, 60, 60, 60, 60, 59, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
            12, 12, 23, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
            12, 12, 30, 12, 12, 12, 12, 12, 12, 12, 12, 12, 23, 12, 12, 12, 12, 12, 12, 12, 
            12, 12, 37, 12, 12, 12, 12, 12, 12, 12, 12, 12, 37, 12, 12, 12, 12, 12, 12, 12, 
            1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 
            8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 8 , 
        ],
        collision: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        ]
    }
    const skyMap = {
        width: 20,
        height: 10,
        tiles: [
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            51, 52, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            60, 60, 60, 52, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            60, 60, 60, 60, 60, 52, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            60, 60, 60, 60, 60, 59, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 
            74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74, 74
        ]
    }
    let character = {
        x: 0, y: 0,
        vx: 0, vy: 0,
        direction: 'right',
        frames: []
    }
    // Create a PixiJS application.
    const app = new PIXI.Application();

    // Intialize the application.
    await app.init({resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    const tileTextures = await splitTiles('nature-platformer-tileset-16x16.png');
    const characterFrames = await splitCharacterFrames('characterFrames.png',1,2)
    let sprite = PIXI.Sprite.from(characterFrames[1])
    sprite.scale.x = sprite.scale.y = SCALE;
    sprite.x = sprite.y = 32;

    let background = new PIXI.Container();
    let sky = new PIXI.Container();
    populateContainer(tileTextures, tileMap, background);
    populateContainer(tileTextures, skyMap, sky);
    background.scale.x = background.scale.y = SCALE;
    sky.scale.x = sky.scale.y = SCALE;
    app.stage.addChild(sky);
    app.stage.addChild(background);
    app.stage.addChild(sprite);
    console.log(characterFrames);
    })();