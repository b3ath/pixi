// Create Pixi application
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0xAAAAAA,
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Create a maze container
const mazeContainer = new PIXI.Container();
app.stage.addChild(mazeContainer);

// Create player sprite
const player = new PIXI.Sprite(PIXI.Texture.from('./imgages/boss.png'));
player.position.set(50, 50);
app.stage.addChild(player);

// Load maze data (you can replace this with your maze data)
const mazeData = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
];

// Create maze graphics
const mazeGraphics = new PIXI.Graphics();
mazeContainer.addChild(mazeGraphics);

// Draw the maze based on the mazeData
function drawMaze() {
    mazeGraphics.clear();

    for (let i = 0; i < mazeData.length; i++) {
        for (let j = 0; j < mazeData[i].length; j++) {
            if (mazeData[i][j] === 1) {
                mazeGraphics.beginFill(0x333333);
                mazeGraphics.drawRect(j * 40, i * 40, 40, 40);
                mazeGraphics.endFill();
            }
        }
    }
}

drawMaze();

// Keyboard input handling
const keys = {
    left: keyboard(37),
    up: keyboard(38),
    right: keyboard(39),
    down: keyboard(40),
};

// Update loop
app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta) {
    // Move the player based on the keyboard input
    if (keys.left.isDown) {
        player.x -= 5;
    }
    if (keys.up.isDown) {
        player.y -= 5;
    }
    if (keys.right.isDown) {
        player.x += 5;
    }
    if (keys.down.isDown) {
        player.y += 5;
    }

    // Check for collision with walls (you may need to implement more complex collision detection based on your maze)
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x > app.screen.width - player.width) {
        player.x = app.screen.width - player.width;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.y > app.screen.height - player.height) {
        player.y = app.screen.height - player.height;
    }

    // You can add more complex collision detection here based on your maze structure
}

// Helper function to handle keyboard input
function keyboard(keyCode) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;

    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    window.addEventListener('keydown', key.downHandler.bind(key), false);
    window.addEventListener('keyup', key.upHandler.bind(key), false);

    return key;
}
