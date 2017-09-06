var brick = new Image();

const BRICK_LENGTH = 40;
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;

let mario = {
  xPos: 2 * BRICK_LENGTH,
  yPos: CANVAS_HEIGHT - (3 * BRICK_LENGTH),
  image: new Image(),
};

const initImages = () => {
  brick.src = "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  mario.image.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/standing.png";
};

const buttonHandler = (e) => {
  switch (e.key) {
    case "ArrowRight":
      console.log('right');
      marioMover(1, 0);
      break;
    case "ArrowLeft":
      marioMover(-1, 0);
      console.log('left');
      break;
    default:
      return;
  }
};

const marioMover = (dx, dy) => {
  mario.xPos += dx * 10;
  mario.yPos += dy * 10;
};

const render = () => {
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // draw bricks
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 20; x++) {
      context.drawImage(brick,
        x * BRICK_LENGTH, CANVAS_HEIGHT - (2 * BRICK_LENGTH) + (y * BRICK_LENGTH),
        BRICK_LENGTH, BRICK_LENGTH);
    }
  }

  // draw mario
  context.drawImage(mario.image,
    mario.xPos, mario.yPos,
    3 * BRICK_LENGTH / 4, BRICK_LENGTH);
};


/******************     MAIN SCRIPT   *****************************/

window.addEventListener('keydown', e => (buttonHandler(e)));

document.addEventListener('DOMContentLoaded', () => {
  initImages();
  window.setInterval(render, 17);
});
