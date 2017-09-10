import { CANVAS_HEIGHT, CANVAS_WIDTH, BRICK_LENGTH } from './constants';
import * as util from './util';
import initializeSuite from './initialize';


const DYING = 'DYING';
const STANDING = 'STANDING';
let MUSIC = true;

const startScreen = () => {
  let startMusic = new Audio('https://s3.amazonaws.com/running-mario-bros-dev/menus/donkey_kong_theme.mp3');

  startMusic.addEventListener('ended', () => {
    startMusic.currentTime = 0;
    startMusic.play();
  }, false);
  startMusic.play();



  document.addEventListener('DOMContentLoaded', () => {

    // toggle music
    const musicButton = document.getElementById('music-button');
    musicButton.addEventListener('click', () => {
      MUSIC = !MUSIC;
      if (MUSIC) {
        startMusic.play();
      } else {
        startMusic.pause();
      }
    });


    let screen = document.getElementById('start-screen');

    // play button
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', (e) => {
      screen.style.zIndex = 2;
      playButton.parentNode.removeChild(playButton);
      startMusic.pause();
      game();
    });
  });
};

const game = () => {
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
      deathScreen();
    } else {
      window.requestAnimationFrame(checkMario);
    }
  };

  window.requestAnimationFrame(checkMario);
  window.setInterval(mario.render, 60);
  document.addEventListener('keypress', (e) => {
    // add other game start statuses, but for now, just make mario run
    if (e.key === 'Enter' && mario.state.status === STANDING) {
      mario.setRunning();
      mario.playTheme();
      window.addEventListener('keydown', keyPress => (mario.jump(keyPress)));
    }
  });
};

const deathScreen = () => {
  const endScreen = document.getElementById('end-screen');
  const endContext = endScreen.getContext('2d');
  endScreen.style.zIndex = 5;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'r') {
      endScreen.style.zIndex = 1;
    }
  });
};

startScreen();
