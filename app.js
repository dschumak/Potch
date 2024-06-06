const TILE_SIZE = 16; // width of each square tile in pixels
(async () =>
{
    // Create a PixiJS application.
    const app = new PIXI.Application();

    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    // Load the bunny texture.
    // const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');

    // Create a new Sprite from an image path.
    // let bunny = new PIXI.Sprite(texture);

    const loadedImage = await PIXI.Assets.load("./assets/nature-paltformer-tileset-16x16.png");
    let frame = new PIXI.Rectangle(32,32,16,16);
    const croppedImage = new PIXI.Texture(loadedImage, frame);
    let bunny = new PIXI.Sprite(croppedImage);
    // Add to stage.
    app.stage.addChild(bunny);

    // Center the sprite's anchor point.
    bunny.anchor.set(0.5);

    // Move the sprite to the center of the screen.
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    app.ticker.add((time) =>
        {
            /**
             * Just for fun, let's rotate mr rabbit a little.
             * Time is a Ticker object which holds time related data.
             * Here we use deltaTime, which is the time elapsed between the frame callbacks
             * to create frame-independent transformation. Keeping the speed consistent.
             */
            bunny.rotation += 0.01 * time.deltaTime;
        });
    })();

async function splitTiles(filename) {
    const tileTextures = await PIXI.Assets.load('./assets/' + filename);
    let tiles = [];
    const xMax = tileTextures.width/TILE_SIZE;
    const yMax = tileTextures.height/TILE_SIZE;
    for (let x = 0; x < xMax; x++) {
        let column = [];
        for (let y = 0; y < yMax; y++) {
            const frame = new PIXI.Rectangle(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            console.log(frame);
            column[y] = new PIXI.Texture(tileTextures, frame);
        }
        tiles[x] = column;
    }
    return tiles;
}