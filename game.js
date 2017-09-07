var brick = new Image();

const BRICK_LENGTH = 40;
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;

// game on or off
let GAME_RUNNING = false;

// mario states
const STANDING = 'STANDING';
const RUNNING = 'RUNNING';
const AIR = 'AIR';

let mario = {
  xPos: 2 * BRICK_LENGTH,
  yPos: CANVAS_HEIGHT - (3 * BRICK_LENGTH),
  prevXPos: -1,
  prevYPos: -1,
  state: STANDING,
  image: {
    standing: new Image(),
    running: [new Image(), new Image(), new Image()],
  },
  runIdx: 0,
};

const initImages = () => {
  brick.src = "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  mario.image.standing.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/standing.png";
  mario.image.running[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armFront.png";
  mario.image.running[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armDown.png";
  mario.image.running[2].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armBack.png";
};

const buttonHandler = (e) => {
  console.log(e);
  if (e.key === " ") {
    marioMover(0, -1);
  }
};

const marioMover = (dx, dy) => {
  mario.prevXPos = mario.xPos;
  mario.prevYPos = mario.yPos;
  mario.xPos += dx * 8;
  mario.yPos += dy * 8;
};

const renderMario = (context) => () => {
  // Erase previous rectangle if any
  if (mario.prevXPos !== -1 || mario.prevYPos !== -1) {
    context.clearRect(mario.prevXPos, mario.prevYPos,
      BRICK_LENGTH, BRICK_LENGTH);
    mario.prevXPos = -1;
    mario.prevYPos = -1;
  } else {
    context.clearRect(mario.xPos, mario.yPos,
      BRICK_LENGTH, BRICK_LENGTH);
  }

  // re-render Mario
  switch (mario.state) {
    case STANDING:
      mario.runIdx = 0;
      context.drawImage(mario.image.standing,
        mario.xPos, mario.yPos,
        3 * BRICK_LENGTH / 4, BRICK_LENGTH);
      break;
    case RUNNING:
      mario.runIdx = (mario.runIdx + 1) % mario.image.running.length;
      context.drawImage(mario.image.running[mario.runIdx],
        mario.xPos, mario.yPos,
        3 * BRICK_LENGTH / 4, BRICK_LENGTH);
        break;
    default:
      return;
  }
};

const renderBricks = (context) => () => {
  context.clearRect(0, CANVAS_HEIGHT - (2 * BRICK_LENGTH),
    CANVAS_WIDTH, (2 * BRICK_LENGTH));


  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 20; x++) {
      context.drawImage(brick,
        x * BRICK_LENGTH, CANVAS_HEIGHT - (2 * BRICK_LENGTH) + (y * BRICK_LENGTH),
        BRICK_LENGTH, BRICK_LENGTH);
    }
  }

  // draw mario
};

const gameStart = () => {

};

/******************     MAIN SCRIPT   *****************************/


document.addEventListener('DOMContentLoaded', () => {
  initImages();
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');



  window.setInterval(renderBricks(context), 17);
  window.setInterval(renderMario(context), 60);
  document.addEventListener('keypress', (e) => {
    // add other game start states, but for now, just make mario run
    if (e.key === 'Enter') {
      window.addEventListener('keydown', keyPress => (buttonHandler(keyPress)));
      mario.state = RUNNING;
    }
  });
});
