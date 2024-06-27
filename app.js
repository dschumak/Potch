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

function testCollision(worldX, worldY) {
    let mapX = Math.floor(worldX / TILE_SIZE / SCALE);
    let mapY = Math.floor(worldY / TILE_SIZE / SCALE);
    return tileMap.collision[mapY * tileMap.width + mapX];
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

    function testCollision(worldX, worldY) {
        let mapX = Math.floor(worldX / TILE_SIZE / SCALE);
        let mapY = Math.floor(worldY / TILE_SIZE / SCALE);
        return tileMap.collision[mapY * tileMap.width + mapX];
    }

    // Create a PixiJS application.
    const app = new PIXI.Application();

    // Intialize the application.
    await app.init({resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
    let kb = new Keyboard();
    kb.watch(app.canvas);

    const tileTextures = await splitTiles('nature-platformer-tileset-16x16.png');
    const characterFrames = await splitCharacterFrames('characterFrames.png',1,2)
    let characterSprite = PIXI.Sprite.from(characterFrames[1])
    characterSprite.scale.x = characterSprite.scale.y = SCALE;
    characterSprite.x = 32;
    characterSprite.y = 32;

    let background = new PIXI.Container();
    let sky = new PIXI.Container();
    populateContainer(tileTextures, tileMap, background);
    populateContainer(tileTextures, skyMap, sky);
    background.scale.x = background.scale.y = SCALE;
    sky.scale.x = sky.scale.y = SCALE;
    app.stage.addChild(sky);
    app.stage.addChild(background);
    app.stage.addChild(characterSprite);

    let character = {
        x: 0, y: 0,
        vx: 0, vy: 0,
        direction: 0,
        jumped: false,
        cycles: {
          'runLeft': [5,6,7,6],
          'runRight': [1,2,3,2]
        }
    };
    console.log(Date.now())
    console.log(Math.floor(Date.now() / 100))
    console.log((Math.floor(Date.now() / 100) % 4))


    app.ticker.add((time) => {
        // console.log(kb.pressed.ArrowUp);
        
        characterSprite.x = character.x;
        characterSprite.y = character.y;
        
        character.vy = Math.min(12, character.vy + 1)
        if (character.vx > 0) {
          character.vx -= 1;
        }
        if (character.vx < 0) {
          character.vx += 1;
        }
        
        let touchingGround = testCollision(
          character.x + 2,
          character.y + TILE_SIZE * SCALE * 2 + 1
        ) || testCollision(
          character.x + TILE_SIZE * SCALE - 3,
          character.y + TILE_SIZE * SCALE * 2 + 1
        );
        
        if (character.vy > 0) {
          for (let i = 0; i < character.vy; i++) {
            let testX1 = character.x + 2;
            let testX2 = character.x + TILE_SIZE * SCALE - 3;
            let testY = character.y + TILE_SIZE * SCALE * 2;
            if (testY > tileMap.height * TILE_SIZE * SCALE || testCollision(testX1, testY) || testCollision(testX2, testY)) {
              character.vy = 0;
              break;
            }
            character.y = character.y + 1;
          }
        }
        if (character.vy < 0) {
          for (let i = character.vy; i < 0; i++) {
            let testX1 = character.x + 2;
            let testX2 = character.x + TILE_SIZE * SCALE - 3;
            let testY = character.y + 5;
            if (testCollision(testX1, testY) || testCollision(testX2, testY)) {
              character.vy = 0;
              break;
            }
            character.y = character.y - 1;
          }
        }
            
        if (character.vx > 0) {
          character.direction = 0;
          for (let i = 0; i < character.vx; i++) {
            let testX = character.x + TILE_SIZE * SCALE - 2;
            let testY1 = character.y + 5;
            let testY2 = character.y + TILE_SIZE * SCALE;
            let testY3 = character.y + TILE_SIZE * SCALE * 2 - 1;
            if (testX >= tileMap.width * TILE_SIZE * SCALE || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
              character.vx = 0;
              break;
            }
            character.x = character.x + 1;
          }
        }
        if (character.vx < 0) {
          character.direction = 1;
          for (let i = character.vx; i < 0; i++) {
            let testX = character.x + 1;
            let testY1 = character.y + 5;
            let testY2 = character.y + TILE_SIZE * SCALE;
            let testY3 = character.y + TILE_SIZE * SCALE * 2 - 1;
            if (testX < 0 || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
              character.vx = 0;
              break;
            }
            character.x = character.x - 1;
          }
        }
        
        if (character.x + scrollX > app.view.width - TILE_SIZE * SCALE * 6){
          scrollX = Math.max(
            app.view.width - tileMap.width * TILE_SIZE * SCALE,
            app.view.width - character.x - TILE_SIZE * SCALE * 6
          );
        }
        if (character.x + scrollX < TILE_SIZE * SCALE * 5){
          scrollX = Math.min(0, -character.x + TILE_SIZE * SCALE * 5);
        }
        if (character.y + scrollY > app.view.height - TILE_SIZE * SCALE * 5){
          scrollY = Math.max(
            app.view.height - tileMap.height * TILE_SIZE * SCALE,
            app.view.height - character.y - TILE_SIZE * SCALE * 5
          );
        }
        if (character.y + scrollY < TILE_SIZE * SCALE * 2) {
          scrollY = Math.min(0, -character.y + TILE_SIZE * SCALE * 2);
        }
        app.stage.x = scrollX;
        sky.x = -scrollX * .5;
        sky.y = -scrollY * .5;
        app.stage.y = scrollY;
        
        let characterFrame = 0;
        if (!touchingGround) {
          characterFrame = character.direction * 4 + 1;
        } else {
          if (character.vx > 0) {
            characterFrame = character.cycles.runRight[(Math.floor(Date.now() / 100) % 4)]
          } else if (character.vx < 0) {
            characterFrame = character.cycles.runLeft[(Math.floor(Date.now() / 100) % 4)]     
          } else {
            characterFrame = character.direction * 4;
          }
        }
        characterSprite.texture = characterFrames[characterFrame];
        
        if (kb.pressed.ArrowRight) {
          character.direction = 0;
          character.vx = Math.min(8, character.vx + 2);
        }
        if (kb.pressed.ArrowLeft) {
          character.direction = 1;
          character.vx = Math.max(-8, character.vx - 2);
        }
        if (!kb.pressed.ArrowUp && touchingGround && character.jumped) {
          character.jumped = false;
        }
        if (kb.pressed.ArrowUp && touchingGround && !character.jumped) {
          character.vy = -19;
          character.jumped = true;
        }
    
        
      });
    })();