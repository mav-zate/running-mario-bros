import { CANVAS_HEIGHT, CANVAS_WIDTH, BRICK_LENGTH } from './constants';
import initializeSuite from './initialize';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');
  const sprites = initializeSuite(context);
  const mario = sprites.mario;
  const brick = sprites.brick;


  debugger
  window.setInterval(brick.render, 17);
  window.setInterval(mario.render, 60);
  document.addEventListener('keypress', (e) => {
    // add other game start statuses, but for now, just make mario run
    if (e.key === 'Enter') {
      mario.setRun();
      window.addEventListener('keydown', keyPress => (mario.jump(keyPress)));
    }
  });
});
