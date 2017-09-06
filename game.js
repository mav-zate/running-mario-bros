var brick = new Image();
var mario = new Image();

const initImages = () => {
  brick.src = "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
};

document.addEventListener('DOMContentLoaded', () => {
  initImages();
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');

  // draw bricks
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 20; x++) {
      context.drawImage(brick, x * 40, canvas.height - 80 + (y * 40), 40, 40);
    }
  }

  // draw mario

});
