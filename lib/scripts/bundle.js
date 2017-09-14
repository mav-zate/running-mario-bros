/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const GOOMBA_LENGTH = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const SPEED = 6;

class Goomba {
  constructor(context, id, musicBoolean) {
    this.state = {
      id: id,
      xPos: CANVAS_WIDTH,
      yPos: CANVAS_HEIGHT - (3 * GOOMBA_LENGTH),
      prevXPos: -1,
      prevYPos: -1,
      images: [new Image(), new Image()],
      alive: true,
      runIdx: 0,
      speed: SPEED,
      height: GOOMBA_LENGTH,
      deathImages: [],
      deathIdx: 0,
      explosion: new Audio('https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/Blast-SoundBible.com-2068539061.wav'),
      musicOn: musicBoolean,
    };
    this.context = context;

    this.render = this.render.bind(this);
    this.setPos = this.setPos.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getId = this.getId.bind(this);
    this.getSpeed = this.getSpeed.bind(this);
    this.die = this.die.bind(this);
    this.prepareDeathImages();
    this.initialize();
  }

  prepareDeathImages() {
    for (let i = 0; i < 16; i++) {
      let image = new Image();
      this.state.deathImages.push(image);
    }
  }

  initialize() {
    this.state.images[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_left.png";
    this.state.images[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_right.png";
    this.state.deathImages[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_1.png";
    this.state.deathImages[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_2.png";
    this.state.deathImages[2].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_3.png";
    this.state.deathImages[3].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_4.png";
    this.state.deathImages[4].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_5.png";
    this.state.deathImages[5].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_6.png";
    this.state.deathImages[6].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_7.png";
    this.state.deathImages[7].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_8.png";
    this.state.deathImages[8].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_9.png";
    this.state.deathImages[9].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_10.png";
    this.state.deathImages[10].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_11.png";
    this.state.deathImages[11].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_12.png";
    this.state.deathImages[12].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_13.png";
    this.state.deathImages[13].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_14.png";
    this.state.deathImages[14].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_15.png";
    this.state.deathImages[15].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_16.png";
  }

  render() {
    // erase prev rectangle
    if (this.state.prevXPos !== -1 || this.state.prevYPos !== -1) {
      this.context.clearRect(this.state.prevXPos, this.state.prevYPos,
        GOOMBA_LENGTH, GOOMBA_LENGTH);
      this.state.prevXPos = -1;
      this.state.prevYPos = -1;
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        GOOMBA_LENGTH, GOOMBA_LENGTH);
    }


    // re-render Goomba
    if (this.state.alive) {
      this.state.runIdx = (this.state.runIdx + 1) % this.state.images.length;
      this.context.drawImage(this.state.images[this.state.runIdx],
      this.state.xPos, this.state.yPos, GOOMBA_LENGTH, GOOMBA_LENGTH);
    } else if (this.state.deathIdx < 15) {
      this.state.deathIdx = (this.state.deathIdx + 1);
      this.context.drawImage(this.state.deathImages[this.state.deathIdx],
      this.state.xPos, this.state.yPos, GOOMBA_LENGTH, GOOMBA_LENGTH);
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        GOOMBA_LENGTH, GOOMBA_LENGTH);
    }

    this.setPos(this.state.xPos - this.state.speed, this.state.yPos);
  }

  setPos(x, y) {
    this.state.prevXPos = this.state.xPos;
    this.state.prevYPos = this.state.yPos;
    this.state.xPos = x;
    this.state.yPos = y;
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  setSpeed(speed) {
    this.state.speed = speed;
  }

  getHeight() {
    return this.state.height;
  }

  getId() {
    return this.state.id;
  }

  getSpeed() {
    return this.state.speed;
  }

  die() {
    this.state.alive = false;
    if (this.state.musicOn) {
      this.state.explosion.play();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Goomba);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mario__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__brick_generator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goomba_generator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__background_generator__ = __webpack_require__(10);





const initializeSuite = (context, marioContext, backgroundContext, musicBoolean) => {
  let objects = {};

  objects.theme = new Audio('https://s3.amazonaws.com/running-mario-bros-dev/env/Super+Mario+Bros+(NES)+Music+-+Overworld+Theme.mp3');
  objects.marioDeath = new Audio('https://s3.amazonaws.com/running-mario-bros-dev/mario/Mario+Death+Sound+Effect.mp3');
  objects.mario = new __WEBPACK_IMPORTED_MODULE_0__mario__["a" /* default */](marioContext, objects.theme, objects.marioDeath, musicBoolean);
  objects.BrickGenerator = new __WEBPACK_IMPORTED_MODULE_1__brick_generator__["a" /* default */](context, objects.mario);
  objects.GoombaGenerator = new __WEBPACK_IMPORTED_MODULE_2__goomba_generator__["a" /* default */](context, objects.mario, musicBoolean);
  objects.BackgroundGenerator = new __WEBPACK_IMPORTED_MODULE_3__background_generator__["a" /* default */](backgroundContext);

  return objects;
};

/* harmony default export */ __webpack_exports__["a"] = (initializeSuite);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const objToArr = (obj) => {
  let array = [];

  Object.keys(obj).forEach((key) => {
    array.push(obj[key]);
  });

  return array;
};
/* unused harmony export objToArr */



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;
const SPEED = 4;

class Brick {
  constructor(context, id) {
    this.state = {
      image: new Image(),
      oldXPos: -1,
      xPos: -1,
      yPos: -1,
      length: BRICK_LENGTH,
      id: id,
      speed: SPEED,
    };
    this.context = context;

    this.initialize();
    this.setPos = this.setPos.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getPos = this.getPos.bind(this);
    this.getId = this.getId.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.isObselete = this.isObselete.bind(this);
    this.render = this.render.bind(this);
  }

  initialize() {
    this.state.image.src =
      "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  }

  render() {
    // clear old image
    if (this.state.oldXPos !== -1) {
      this.context.clearRect(this.state.oldXPos, this.state.yPos,
        BRICK_LENGTH, BRICK_LENGTH);
    }
    // move background
    this.state.oldXPos = this.state.xPos;
    this.state.xPos -= this.state.speed;
    // draw
    this.context.drawImage(this.state.image,
      this.state.xPos, this.state.yPos, BRICK_LENGTH, BRICK_LENGTH);
  }

  setPos(x, y) {
    this.state.xPos = x;
    this.state.yPos = y;
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  getHeight() {
    return this.state.length;
  }

  getImage() {
    return this.state.image;
  }

  getId() {
    return this.state.id;
  }

  isObselete() {
    if (this.state.xPos + this.getHeight() < 0) {
      return true;
    } else {
      return false;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Brick);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brick__ = __webpack_require__(4);


const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class BrickGenerator {
  constructor(context, mario) {
    this.state = {
      bricks: [],
      brickId: 1,
      mario: mario,
    };
    this.context = context;
    this.getBricks = this.getBricks.bind(this);
    this.render = this.render.bind(this);
    this.reset = this.reset.bind(this);
    this.generateBrick = this.generateBrick.bind(this);
    this.removeBricks = this.removeBricks.bind(this);

    this.initialize();
  }

  initialize() {
    for (let x = 0; x < 22; x++) {
      for (let y = 0; y < 2; y++) {
        let brick = new __WEBPACK_IMPORTED_MODULE_0__brick__["a" /* default */](this.context, this.state.brickId);
        this.state.brickId++;
        brick.setPos(x * BRICK_LENGTH, CANVAS_HEIGHT - ((y + 1) * BRICK_LENGTH));
        this.state.bricks.push(brick);
        this.state.mario.receiveOthers(brick);
      }
    }
  }

  render() {
    this.state.bricks.forEach((brick) => {
      brick.render();
    });

    if (this.state.bricks[0].isObselete()) {
      this.removeBricks();
      this.generateBrick(CANVAS_WIDTH, CANVAS_HEIGHT - (BRICK_LENGTH * 1));
      this.generateBrick(CANVAS_WIDTH, CANVAS_HEIGHT - (BRICK_LENGTH * 2));
    }
  }

  getBricks() {
    return this.state.bricks;
  }

  reset() {
    this.state.bricks = [];
    this.state.brickId = 1;
    this.initialize();
  }

  generateBrick(x, y) {
    let brick = new __WEBPACK_IMPORTED_MODULE_0__brick__["a" /* default */](this.context, this.brickId);
    this.brickId++;
    brick.setPos(x, y);
    this.state.bricks.push(brick);
    this.state.mario.receiveOthers(brick);
  }

  removeBricks() {
    this.state.bricks.shift();
    this.state.bricks.shift();
  }
}


/* harmony default export */ __webpack_exports__["a"] = (BrickGenerator);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__initialize__ = __webpack_require__(2);





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
  const sprites = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__initialize__["a" /* default */])(context, marioContext, backgroundContext, MUSIC);
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
      context.clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__constants__["CANVAS_WIDTH"], __WEBPACK_IMPORTED_MODULE_0__constants__["CANVAS_HEIGHT"]);
      marioContext.clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__constants__["CANVAS_WIDTH"], __WEBPACK_IMPORTED_MODULE_0__constants__["CANVAS_HEIGHT"]);
      backgroundContext.clearRect(0, 0, __WEBPACK_IMPORTED_MODULE_0__constants__["CANVAS_WIDTH"], __WEBPACK_IMPORTED_MODULE_0__constants__["CANVAS_HEIGHT"]);
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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__goomba__ = __webpack_require__(0);



const GOOMBA_HEIGHT = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

class GoombaGenerator {
  constructor(context, mario, musicBoolean) {
    this.state = {
      goombas: [],
      intervals: [750, 1500, 2250],
      mario: mario,
      goombaId: 100,
      musicOn: musicBoolean,
    };
    this.context = context;
    this.getGoombas = this.getGoombas.bind(this);
    this.render = this.render.bind(this);
    this.generateGoomba = this.generateGoomba.bind(this);
    this.removeGoomba = this.removeGoomba.bind(this);
    this.runGenerator = this.runGenerator.bind(this);
    this.reset = this.reset.bind(this);

    this.runGenerator();
  }

  runGenerator() {
    let intervals = this.state.intervals;
    let randomIndex = Math.floor(Math.random() * intervals.length);
    let randomTime = intervals[randomIndex];
    window.setTimeout(() => {
      this.generateGoomba();
      this.runGenerator();
    }, randomTime);
  }

  render() {
    this.state.goombas.forEach((goomba) => {
      goomba.render();
    });
    this.removeGoomba();
  }

  getGoombas() {
    return this.state.goombas;
  }

  generateGoomba() {
    let goomba = new __WEBPACK_IMPORTED_MODULE_0__goomba__["a" /* default */](this.context, this.state.goombaId, this.state.musicOn);
    this.state.goombaId++;
    this.state.goombas.push(goomba);
    this.state.mario.receiveOthers([goomba]);
  }

  removeGoomba() {
    if (this.state.goombas.length === 0) {
      return;
    }

    let firstGoomba = this.state.goombas[0];
    let goombaRightSide = firstGoomba.getPos()[0] + firstGoomba.getHeight();
    // either passed under mario or killed
    if (goombaRightSide < 0) {
      // remove from mario's others and goomba generator
      let goombaId = firstGoomba.getId();
      this.state.goombas.shift();
      this.state.mario.removeOther(goombaId);
    }
  }

  reset() {
    this.state.goombas = [];
    this.goombaId = 100;
  }
}


/* harmony default export */ __webpack_exports__["a"] = (GoombaGenerator);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const STANDING = 'STANDING';
const RUNNING = 'RUNNING';
const JUMPING = 'JUMPING';
const DEAD = 'DEAD';
const DYING = 'DYING';
const CANVAS_HEIGHT = 500;
const SMALL_MARIO_HEIGHT = 40;
const SMALL_MARIO_WIDTH =  3 * SMALL_MARIO_HEIGHT / 4;
const BRICK_LENGTH = 40;
const G_ACCELERATION = 9;
const JUMP_VELOCITY = 60;

class Mario {
  constructor(context, themeMusic, deathSound, musicBoolean) {
    this.state = {
      xPos: 2 * SMALL_MARIO_HEIGHT,
      yPos: CANVAS_HEIGHT - (3 * SMALL_MARIO_HEIGHT),
      prevXPos: -1,
      prevYPos: -1,
      status: STANDING,
      image: {
        standing: new Image(),
        running: [new Image(), new Image(), new Image()],
        jumping: new Image(),
        dying: new Image(),
      },
      music: {
        theme: themeMusic,
        death: deathSound,
        jump: new Audio('https://s3.amazonaws.com/running-mario-bros-dev/mario/smb_jump-small.wav'),
      },
      jump: {
        baseHeight: -1,
        velocity: -1,
      },
      others: [],
      runIdx: 0,
      musicOn: musicBoolean,
    };
    this.context = context;
    this.initialize();

    this.render = this.render.bind(this);
    this.jump = this.jump.bind(this);
    this.renderJump = this.renderJump.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setJumping = this.setJumping.bind(this);
    this.handleBottomCollision = this.handleBottomCollision.bind(this);
    this.handleFrontCollision = this.handleFrontCollision.bind(this);
    this.receiveOthers = this.receiveOthers.bind(this);
    this.removeOther = this.removeOther.bind(this);
    this.renderDeath = this.renderDeath.bind(this);
    this.landOn = this.landOn.bind(this);
    this.setPos = this.setPos.bind(this);
    this.getPos = this.getPos.bind(this);
    this.die = this.die.bind(this);
    this.playTheme = this.playTheme.bind(this);
    this.playDeath = this.playDeath.bind(this);
    this.playJump = this.playJump.bind(this);
    this.clearOthers = this.clearOthers.bind(this);
  }

  initialize() {
    this.state.image.standing.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/standing.png";
    this.state.image.running[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armFront.png";
    this.state.image.running[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armDown.png";
    this.state.image.running[2].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armBack.png";
    this.state.image.jumping.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/jumping.png";
    this.state.image.dying.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/death.png";
  }

  render() {
    // Erase previous rectangle if any
    if (this.state.prevXPos !== -1 || this.state.prevYPos !== -1) {
      this.context.clearRect(this.state.prevXPos, this.state.prevYPos,
        SMALL_MARIO_HEIGHT, SMALL_MARIO_HEIGHT);
      this.state.prevXPos = -1;
      this.state.prevYPos = -1;
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        SMALL_MARIO_HEIGHT, SMALL_MARIO_HEIGHT);
    }


    // handle bottom collisions
    this.handleFrontCollision();
    if (this.state.status === JUMPING) {
      this.handleBottomCollision();
    }

    if (this.state.status === DYING && this.state.yPos > CANVAS_HEIGHT) {
      this.state.status = DEAD;
    }

    // re-render Mario
    switch (this.state.status) {
      case STANDING:
        this.state.runIdx = 0;
        this.context.drawImage(this.state.image.standing,
          this.state.xPos, this.state.yPos,
          SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
        break;
      case RUNNING:
        this.state.runIdx = (this.state.runIdx + 1) % this.state.image.running.length;
        this.context.drawImage(this.state.image.running[this.state.runIdx],
          this.state.xPos, this.state.yPos,
          SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
        break;
      case JUMPING:
        this.renderJump();
        break;
      case DYING:
        this.renderDeath();
        break;
      default:
        return;
    }
  }

  landOn(pos) {
    this.setPos(this.state.xPos, pos[1] - SMALL_MARIO_HEIGHT);
    this.setRunning();
  }

  setPos(x, y) {
    this.state.xPos = x;
    this.state.yPos = y;
  }

  renderDeath() {
    this.state.jump.velocity -= G_ACCELERATION;
    this.state.yPos -= this.state.jump.velocity;
    this.context.drawImage(this.state.image.dying,
      this.state.xPos, this.state.yPos,
      SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
  }

  renderJump() {
    this.state.jump.velocity -= G_ACCELERATION;
    this.state.yPos -= this.state.jump.velocity;
    this.context.drawImage(this.state.image.jumping,
      this.state.xPos, this.state.yPos,
      SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
  }

  jump(e) {
    if (e.key === " " && this.state.status === RUNNING) {
      this.state.runIdx = 0;
      this.playJump();
      this.setJumping();
    }
  }

  setRunning() {
    this.state.status = RUNNING;
  }

  setJumping() {
    this.state.status = JUMPING;
    this.state.jump.baseHeight = this.state.yPos;
    this.state.jump.velocity = JUMP_VELOCITY;
  }

  handleBottomCollision() {
    let currentBottom = this.state.yPos + SMALL_MARIO_HEIGHT;
    let nextYPos = this.state.yPos - (this.state.jump.velocity - G_ACCELERATION);
    let nextBottom = nextYPos + SMALL_MARIO_HEIGHT;


    this.state.others.forEach(other => {
      let otherPos = other.getPos();
      let withinXRange = this.state.xPos >= otherPos[0] &&
                         this.state.xPos <= otherPos[0] + BRICK_LENGTH;
      if (withinXRange && currentBottom > otherPos[1] ||
        withinXRange && nextBottom >= otherPos[1]) {
        console.log('bottom-collision');
        if (other.constructor.name === 'Goomba') {
          other.die();
          this.setJumping();
        } else {
          this.landOn(otherPos);
        }
        return;
      }
    });
  }

  handleFrontCollision() {
    let marioBottom = this.state.yPos + SMALL_MARIO_HEIGHT;
    let marioFront = this.state.xPos + SMALL_MARIO_WIDTH;

    this.state.others.forEach(other => {
      let otherPos = other.getPos();
      let minKillHeight = otherPos[1] + (other.getHeight() / 2);
      if (marioFront >= otherPos[0] && marioBottom > minKillHeight
        && otherPos[0] >= this.state.xPos) {
        if (this.state.status !== DYING) {
          this.die();
          this.playDeath();
        }
        console.log('front-collision');
        return;
      }
    });
  }

  receiveOthers(others) {
    this.state.others = this.state.others.concat(others);
  }

  removeOther(otherId) {
    let index;

    for (let i = 0; i < this.state.others.length; i++) {
      if (this.state.others[i].getId() === otherId) {
        index = i;
        break;
      }
    }

    this.state.others.splice(index, 1);
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  die() {
    this.state.status = DYING;
    this.state.jump.velocity = 40;
  }

  playTheme() {
    if (this.state.musicOn) {
      this.state.music.theme.play();
    }
  }

  playDeath() {
    if (this.state.musicOn) {
      this.clearOthers();
      this.state.music.theme.pause();
      this.state.music.death.play();
    }
  }

  playJump() {
    if (this.state.musicOn) {
      this.state.music.jump.play();
    }
  }

  reset() {
    this.state.others = [];
    this.setRunning();
    this.playTheme();
  }

  clearOthers() {
    this.state.others = [];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Mario);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BACKGROUND_WIDTH = 2400;
const BACKGROUND_HEIGHT = 420;
const SPEED = 1;


class Background {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    this.oldLeft = -1;
    this.left = -1;
    this.top = -1;
    this.right = -1;
    this.speed = SPEED;

    // bindings
    this.setPos = this.setPos.bind(this);
    this.isObselete = this.isObselete.bind(this);
    this.getEndPos = this.getEndPos.bind(this);

    this.initialize();
  }

  initialize() {
    this.image.src = "https://s3.amazonaws.com/running-mario-bros-dev/background/super_mario_background.png";
  }

  render() {
    // clear old image
    if (this.oldLeft !== -1) {
      this.context.clearRect(this.oldLeft, this.top,
        BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
    }
    // move background
    this.oldLeft = this.left;
    this.left -= this.speed;
    this.right -= this.speed;
    // draw
    this.context.drawImage(this.image,
      this.left, this.top, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
  }

  setPos(x, y) {
    this.left = x;
    this.top = y;
    this.right = x + BACKGROUND_WIDTH;
    this.bottom = y + BACKGROUND_HEIGHT;
  }

  isObselete() {
    if (this.right < 0) {
      return true;
    } else {
      return false;
    }
  }

  getEndPos() {
    return this.right;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Background);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(9);




class BackgroundGenerator {
  constructor(context) {
    this.context = context;
    this.backgrounds = [];

    // bindings
    this.render = this.render.bind(this);
    this.recycleBackground = this.recycleBackground.bind(this);
    this.generateBackground = this.generateBackground.bind(this);

    this.initialize();
  }

  initialize() {
    this.generateBackground(0, 0);
    this.generateBackground(2400, 0);
  }

  generateBackground(x, y) {
    let background = new __WEBPACK_IMPORTED_MODULE_0__background__["a" /* default */](this.context);
    background.setPos(x, y);
    this.backgrounds.push(background);
  }


  render() {
    this.backgrounds.forEach((bg) => {
      bg.render();
    });
    if (this.backgrounds[0].isObselete()) {
      this.recycleBackground();
    }
  }

  recycleBackground() {
    this.backgrounds.shift();
    let current = this.backgrounds[0];
    let endPos = current.getEndPos();
    this.generateBackground(endPos, 0);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BackgroundGenerator);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map