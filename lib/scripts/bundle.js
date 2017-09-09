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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mario__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__brick_generator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goomba__ = __webpack_require__(6);




const initializeSuite = (context) => {
  let objects = {};

  objects.mario = new __WEBPACK_IMPORTED_MODULE_0__mario__["a" /* default */](context);
  objects.BrickGenerator = new __WEBPACK_IMPORTED_MODULE_1__brick_generator__["a" /* default */](context);
  objects.goomba = new __WEBPACK_IMPORTED_MODULE_2__goomba__["a" /* default */](context);

  return objects;
};

/* harmony default export */ __webpack_exports__["a"] = (initializeSuite);


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class Brick {
  constructor(context) {
    this.state = {
      image: new Image(),
      xPos: -1,
      yPos: -1,
    };
    this.context = context;

    this.initialize();
    this.setPos = this.setPos.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getPos = this.getPos.bind(this);
  }

  initialize() {
    this.state.image.src =
      "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  }

  setPos(x, y) {
    this.state.xPos = x;
    this.state.yPos = y;
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  getImage() {
    return this.state.image;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Brick);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brick__ = __webpack_require__(3);


const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class BrickGenerator {
  constructor(context) {
    this.state = {
      bricks: [],
    };
    this.context = context;
    this.getBricks = this.getBricks.bind(this);
    this.render = this.render.bind(this);

    this.initialize();
  }

  initialize() {
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 20; x++) {
        let brick = new __WEBPACK_IMPORTED_MODULE_0__brick__["a" /* default */](this.context);
        brick.setPos(x * BRICK_LENGTH, CANVAS_HEIGHT - ((y + 1) * BRICK_LENGTH));
        this.state.bricks.push(brick);
      }
    }
  }

  render() {
    this.context.clearRect(0, CANVAS_HEIGHT - (2 * BRICK_LENGTH),
    CANVAS_WIDTH, (2 * BRICK_LENGTH));


    this.state.bricks.forEach((brick) => {
      const pos = brick.getPos();
      this.context.drawImage(brick.getImage(),
        pos[0], pos[1], BRICK_LENGTH, BRICK_LENGTH
      );
    });
  }

  getBricks() {
    return this.state.bricks;
  }
}


/* harmony default export */ __webpack_exports__["a"] = (BrickGenerator);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__initialize__ = __webpack_require__(1);







document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');
  const sprites = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__initialize__["a" /* default */])(context);
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


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const GOOMBA_HEIGHT = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

class Goomba {
  constructor(context) {
    this.state = {
      xPos: CANVAS_WIDTH,
      yPos: CANVAS_HEIGHT - (3 * GOOMBA_HEIGHT),
      prevXPos: -1,
      prevYPos: -1,
      images: [new Image(), new Image()],
      alive: true,
      runIdx: 0,
    };
    this.context = context;

    this.render = this.render.bind(this);
    this.setPos = this.setPos.bind(this);
    this.initialize();
  }

  initialize() {
    this.state.images[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_left.png";
    this.state.images[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_right.png";
  }

  render() {
    // erase prev rectangle
    if (this.state.prevXPos !== -1 || this.state.prevYPos !== -1) {
      this.context.clearRect(this.state.prevXPos, this.state.prevYPos,
        GOOMBA_HEIGHT, GOOMBA_HEIGHT);
      this.state.prevXPos = -1;
      this.state.prevYPos = -1;
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        GOOMBA_HEIGHT, GOOMBA_HEIGHT);
    }


    // re-render Goomba
    if (this.state.alive) {
      this.state.runIdx = (this.state.runIdx + 1) % this.state.images.length;
      this.context.drawImage(this.state.images[this.state.runIdx],
      this.state.xPos, this.state.yPos, GOOMBA_HEIGHT, GOOMBA_HEIGHT);
    }

    this.setPos(this.state.xPos - 6, this.state.yPos);
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
}

/* harmony default export */ __webpack_exports__["a"] = (Goomba);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const STANDING = 'STANDING';
const RUNNING = 'RUNNING';
const JUMPING = 'JUMPING';
const CANVAS_HEIGHT = 500;
const SMALL_MARIO_HEIGHT = 40;
const BRICK_LENGTH = 40;
const G_ACCELERATION = 4;

class Mario {
  constructor(context) {
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
      },
      jump: {
        baseHeight: -1,
        velocity: -1,
      },
      others: [],
      runIdx: 0,
    };
    this.context = context;
    this.initialize();

    this.render = this.render.bind(this);
    this.jump = this.jump.bind(this);
    this.renderJump = this.renderJump.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setJumping = this.setJumping.bind(this);
    this.handleBottomCollision = this.handleBottomCollision.bind(this);
    this.receiveOthers = this.receiveOthers.bind(this);
    this.landOn = this.landOn.bind(this);
    this.setPos = this.setPos.bind(this);
  }

  initialize() {
    this.state.image.standing.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/standing.png";
    this.state.image.running[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armFront.png";
    this.state.image.running[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armDown.png";
    this.state.image.running[2].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armBack.png";
    this.state.image.jumping.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/jumping.png";
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
    if (this.state.status === JUMPING) {
      this.handleBottomCollision();
    }

    // re-render Mario
    switch (this.state.status) {
      case STANDING:
        this.runIdx = 0;
        this.context.drawImage(this.state.image.standing,
          this.state.xPos, this.state.yPos,
          3 * SMALL_MARIO_HEIGHT / 4, SMALL_MARIO_HEIGHT);
        break;
      case RUNNING:
        this.runIdx = (this.runIdx + 1) % this.state.image.running.length;
        this.context.drawImage(this.state.image.running[this.runIdx],
          this.state.xPos, this.state.yPos,
          3 * SMALL_MARIO_HEIGHT / 4, SMALL_MARIO_HEIGHT);
          break;
      case JUMPING:
          this.renderJump();
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

  renderJump() {
    if (this.state.yPos <= this.state.jump.baseHeight) {
      this.state.jump.velocity -= G_ACCELERATION;
      this.state.yPos -= this.state.jump.velocity;
    } else {
      this.setRunning();
    }
    this.context.drawImage(this.state.image.jumping,
      this.state.xPos, this.state.yPos,
      3 * SMALL_MARIO_HEIGHT / 4, SMALL_MARIO_HEIGHT);
  }

  jump(e) {
    if (e.key === " " && this.state.status === RUNNING) {
      this.runIdx = 0;
      this.setJumping();
    }
  }

  setRunning() {
    this.state.status = RUNNING;
  }

  setJumping() {
    this.state.status = JUMPING;
    this.state.jump.baseHeight = this.state.yPos;
    this.state.jump.velocity = 30;
  }

  handleBottomCollision() {
    let nextYPos = this.state.yPos - (this.state.jump.velocity - G_ACCELERATION);
    let nextBottom = nextYPos + SMALL_MARIO_HEIGHT;


    this.state.others.forEach(other => {
      let otherPos = other.getPos();
      let currentBottom = this.state.yPos + SMALL_MARIO_HEIGHT;
      let withinXRange = this.state.xPos >= otherPos[0] &&
                         this.state.xPos <= otherPos[0] + BRICK_LENGTH;
      if (withinXRange && currentBottom > otherPos[1] ||
        withinXRange && nextBottom >= otherPos[1]) {
        console.log('collision');
        this.landOn(otherPos);
        return;
      }
    });
  }

  receiveOthers(others) {
    this.state.others = others;
  }
}

/* mario, possible collisions:
  1. land on other object
    - if bottom of mario greater than top of other
    - or if next position greater than top of other
  2. hit bottom of other object
  3. hit side of other object
*/


/* harmony default export */ __webpack_exports__["a"] = (Mario);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map