import { CANVAS_HEIGHT, CANVAS_WIDTH, BRICK_LENGTH } from './constants';
import * as util from './util';
import initializeSuite from './initialize';


const DYING = 'DYING';
const STANDING = 'STANDING';
const DEAD = 'DEAD';
let MUSIC = true;
let FROZEN = false;
let PAUSED = false;

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
      document.getElementById('high-score-menu').remove();
      game();
    });
  });
};



const game = () => {
  // game objects canvas
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');
  // mario canvas
  const marioCanvas = document.getElementById('mario');
  const marioContext = marioCanvas.getContext('2d');
  // background canvas
  const backgroundCanvas = document.getElementById('game-background');
  const backgroundContext = backgroundCanvas.getContext('2d');
  const sprites = initializeSuite(context, marioContext, backgroundContext, MUSIC);
  const BrickGenerator = sprites.BrickGenerator;
  const bricks = BrickGenerator.getBricks();
  const GoombaGenerator = sprites.GoombaGenerator;
  const BackgroundGenerator = sprites.BackgroundGenerator;

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
  let goombaInt = window.setInterval(GoombaGenerator.render, 33);
  let BrickInt = window.setInterval(BrickGenerator.render, 33);
  let backgroundInt = window.setInterval(BackgroundGenerator.render, 33);
  let marioInt = window.setInterval(mario.render, 60);

  let freeze = () => {
    window.clearInterval(goombaInt);
    window.clearInterval(BrickInt);
    window.clearInterval(scoreInt);
    window.clearInterval(backgroundInt);
    frozen = true;
  };

  let pause = () => {
    window.clearInterval(goombaInt);
    window.clearInterval(BrickInt);
    window.clearInterval(scoreInt);
    window.clearInterval(backgroundInt);
    window.clearInterval(marioInt);
  };

  let resume = () => {
    goombaInt = window.setInterval(GoombaGenerator.render, 33);
    BrickInt = window.setInterval(BrickGenerator.render, 33);
    backgroundInt = window.setInterval(BackgroundGenerator.render, 33);
    scoreInt = window.setInterval(() => {
      score += 1;
      context.clearRect(0, 0, 400, 80);
      context.fillText(`SCORE: ${score}`, 20, 40);
    }, 30);
    marioInt = window.setInterval(mario.render, 60);
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
  mario.setRunning();
  if (MUSIC) {
    mario.playTheme();
  }

  window.addEventListener('keydown', keyPress => {
    mario.jump(keyPress);

    if (mario.state.status === DYING || mario.state.status === DEAD) {
      return;
    }

    if (!PAUSED && keyPress.key === 'm' || keyPress.key === 'M') {
      pause();
      PAUSED = !PAUSED;
    } else if (PAUSED && keyPress.key === 'm' || keyPress.key === 'M') {
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      marioContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      backgroundContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      resume();
      PAUSED = !PAUSED;
    }
  });

  const deathScreen = () => {
    let gameOver = new Audio('https://s3.amazonaws.com/running-mario-bros-dev/menus/Super+Mario+Bros+(NES)+Music+-+Game+Over+1.mp3');
    if (MUSIC) {
      gameOver.play();
    }
    const endScreen = document.getElementById('end-screen');
    const endContext = endScreen.getContext('2d');
    endScreen.style.zIndex = 5;

    window.setTimeout(() => {
      endContext.font = '20px mario';
      endContext.fillStyle = 'white';
      endContext.fillText("GAME OVER", 310, 200);
      endContext.fillText("PRESS ENTER TO RESTART", 180, 240);
      endContext.fillText("ENTER YOUR NAME:", 180, 400);

      // create high score input and submit
      let playerName;
      let nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.setAttribute('id', 'player-name-input');
      let gameSpace = document.getElementById('game-space');
      gameSpace.appendChild(nameInput);
      let submitName = document.createElement('input');
      submitName.type = 'submit';
      submitName.textContent = 'SUBMIT';
      submitName.setAttribute('id', 'player-name-submit');
      gameSpace.appendChild(submitName);

      nameInput.addEventListener('change', () => {
        playerName = nameInput.value;
      });
      submitName.addEventListener('click', (e) => {
        e.preventDefault();
        // player name
        let playerNameTag = document.createElement('p');
        playerNameTag.textContent = `${playerName}`;
        playerNameTag.setAttribute('id', 'player-name');
        // player score
        let playerScoreTag = document.createElement('p');
        playerScoreTag.textContent = `${score}`;
        playerScoreTag.setAttribute('id', 'player-score');
        // add to DOMContent
        gameSpace.appendChild(playerNameTag);
        gameSpace.appendChild(playerScoreTag);
      });
    }, 200);


    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        location.reload();
      }
    });
  };
};




startScreen();
