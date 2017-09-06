var brick = new Image();
var mario = new Image();

const BRICK_LENGTH = 40;

const initImages = () => {
  brick.src = "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  mario.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/standing.png";
};

const buttonHandler = (e) => {
  if (e.key === "ArrowRight") {
    
  } else if (e.key === "ArrowLeft") {
    console.log("I'm working left, lol");
  }
};

const render = () => {
  initImages();
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');

  // draw bricks
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 20; x++) {
      context.drawImage(brick,
        x * BRICK_LENGTH, canvas.height - (2 * BRICK_LENGTH) + (y * BRICK_LENGTH),
        BRICK_LENGTH, BRICK_LENGTH);
    }
  }

  // draw mario
  context.drawImage(mario,
    2 * BRICK_LENGTH, canvas.height - (3 * BRICK_LENGTH),
    3 * BRICK_LENGTH / 4, BRICK_LENGTH);
};


window.addEventListener('keydown', e => (buttonHandler(e)));

document.addEventListener('DOMContentLoaded', () => {
  // make mario move right
  window.setInterval(render, 17);
});
