import { CANVAS_HEIGHT, CANVAS_WIDTH, BRICK_LENGTH } from './constants';
import * as util from './util';
import initializeSuite from './initialize';


const DYING = 'DYING';
const STANDING = 'STANDING';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');
  const marioCanvas = document.getElementById('mario');
  const marioContext = marioCanvas.getContext('2d');
  const sprites = initializeSuite(context, marioContext);
  const BrickGenerator = sprites.BrickGenerator;
  const bricks = BrickGenerator.getBricks();
  const GoombaGenerator = sprites.GoombaGenerator;


  const mario = sprites.mario;
  mario.receiveOthers(bricks);

  let goombaInt = window.setInterval(GoombaGenerator.render, 17);
  let BrickInt = window.setInterval(BrickGenerator.render, 17);
  let freeze = () => {
    window.clearInterval(goombaInt);
    window.clearInterval(BrickInt);
  };
  let checkMario = () => {
    if (mario.state.status === DYING) {
      freeze();
    }
  };

  window.setInterval(checkMario, 10);
  window.setInterval(mario.render, 60);
  document.addEventListener('keypress', (e) => {
    // add other game start statuses, but for now, just make mario run
    if (e.key === 'Enter' && mario.state.status === STANDING) {
      mario.setRunning();
      mario.playTheme();
      window.addEventListener('keydown', keyPress => (mario.jump(keyPress)));
    }
  });
});
