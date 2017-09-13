import { CANVAS_HEIGHT, CANVAS_WIDTH, BRICK_LENGTH } from './constants';
import * as util from './util';
import initializeSuite from './initialize';


const DYING = 'DYING';
const STANDING = 'STANDING';
const DEAD = 'DEAD';
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
      let modal = document.getElementById('instructions-modal');
      if (modal) {
        modal.remove();
      }
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

  let score = 0;

  let scoreInt;
  window.setTimeout( () => {
    context.font = "20px mario";
    context.fillStyle = "white";
    scoreInt = window.setInterval(() => {
      score += 1;
      context.clearRect(0, 0, 400, 80);
      context.fillText(`SCORE: ${score}`, 20, 40);
    }, 30);
  }, 100);


  const mario = sprites.mario;
  mario.receiveOthers(bricks);

  let frozen = false;
  let goombaInt = window.setInterval(GoombaGenerator.render, 17);
  let BrickInt = window.setInterval(BrickGenerator.render, 17);
  let freeze = () => {
    window.clearInterval(goombaInt);
    window.clearInterval(BrickInt);
    window.clearInterval(scoreInt);
    frozen = true;
  };

  let checkMario = () => {
    if (!frozen && mario.state.status === DYING) {
      freeze();
      window.requestAnimationFrame(checkMario);
    } else if (frozen && mario.state.status === DEAD) {
      window.setTimeout(deathScreen, 3000);
    } else {
      window.requestAnimationFrame(checkMario);
    }
  };


  window.requestAnimationFrame(checkMario);
  window.setInterval(mario.render, 60);
  mario.setRunning();
  mario.playTheme();
  window.addEventListener('keydown', keyPress => (mario.jump(keyPress)));

  const deathScreen = () => {
    let gameOver = new Audio('https://s3.amazonaws.com/running-mario-bros-dev/menus/Super+Mario+Bros+(NES)+Music+-+Game+Over+1.mp3');
    gameOver.play();
    const endScreen = document.getElementById('end-screen');
    const endContext = endScreen.getContext('2d');
    endScreen.style.zIndex = 5;

    window.setTimeout(() => {
      endContext.font = '20px mario';
      endContext.fillStyle = 'white';
      endContext.fillText("PRESS ENTER TO RESTART", 180, 260);
    }, 200);


    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        location.reload();
      }
    });
  };
};




startScreen();
