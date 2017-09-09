import { CANVAS_HEIGHT, CANVAS_WIDTH, BRICK_LENGTH } from './constants';
import * as util from './util';
import initializeSuite from './initialize';




document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');
  const sprites = initializeSuite(context);
  const BrickGenerator = sprites.BrickGenerator;
  const bricks = BrickGenerator.getBricks();
  const goomba = sprites.goomba;


  const mario = sprites.mario;
  mario.receiveOthers(bricks.concat([goomba]));

  window.setInterval(goomba.render, 80);
  window.setInterval(BrickGenerator.render, 17);
  window.setInterval(mario.render, 60);
  document.addEventListener('keypress', (e) => {
    // add other game start statuses, but for now, just make mario run
    if (e.key === 'Enter') {
      mario.setRunning();
      // make mario class scalable
      window.addEventListener('keydown', keyPress => (mario.jump(keyPress)));
    }
  });
});
