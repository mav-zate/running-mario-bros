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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__initialize__ = __webpack_require__(3);




document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-screen');
  const context = canvas.getContext('2d');
  const sprites = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__initialize__["a" /* default */])(context);
  const mario = sprites.mario;
  const brick = sprites.brick;

  window.setInterval(brick.render, 17);
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
/* 1 */
/***/ (function(module, exports) {

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const STANDING = 'STANDING';
const RUNNING = 'RUNNING';
const JUMPING = 'JUMPING';
const CANVAS_HEIGHT = 500;
const BRICK_LENGTH = 40;

class Mario {
  constructor(context) {
    this.state = {
      xPos: 2 * BRICK_LENGTH,
      yPos: CANVAS_HEIGHT - (3 * BRICK_LENGTH),
      prevXPos: -1,
      prevYPos: -1,
      status: STANDING,
      image: {
        standing: new Image(),
        running: [new Image(), new Image(), new Image()],
        jumping: new Image(),
      },
      runIdx: 0,
    };
    this.context = context;
    this.initialize();

    this.render = this.render.bind(this);
    this.move = this.move.bind(this);
    this.jump = this.jump.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setJumping = this.setJumping.bind(this);
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
        BRICK_LENGTH, BRICK_LENGTH);
      this.state.prevXPos = -1;
      this.state.prevYPos = -1;
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        BRICK_LENGTH, BRICK_LENGTH);
    }

    // re-render Mario
    switch (this.state.status) {
      case STANDING:
        this.runIdx = 0;
        this.context.drawImage(this.state.image.standing,
          this.state.xPos, this.state.yPos,
          3 * BRICK_LENGTH / 4, BRICK_LENGTH);
        break;
      case RUNNING:
        this.runIdx = (this.runIdx + 1) % this.state.image.running.length;
        this.context.drawImage(this.state.image.running[this.runIdx],
          this.state.xPos, this.state.yPos,
          3 * BRICK_LENGTH / 4, BRICK_LENGTH);
          break;
      case JUMPING:
        this.runIdx = 0;
        this.context.drawImage(this.state.image.jumping,
          this.state.xPos, this.state.yPos,
          3 * BRICK_LENGTH / 4, BRICK_LENGTH);
          break;
      default:
        return;
    }
  }

  move(dx, dy) {
    this.state.prevXPos = this.state.xPos;
    this.state.prevYPos = this.state.yPos;
    this.state.xPos += dx * 8;
    this.state.yPos += dy * 8;
  }

  jump(e) {
    if (e.key === " ") {
      this.move(0, -1);
      this.setJumping();
    }
  }

  setRunning() {
    this.state.status = RUNNING;
  }

  setJumping() {
    this.state.status = JUMPING;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Mario);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mario__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__brick__ = __webpack_require__(4);



const initializeSuite = (context) => {
  let objects = {};

  objects.mario = new __WEBPACK_IMPORTED_MODULE_0__mario__["a" /* default */](context);
  objects.brick = new __WEBPACK_IMPORTED_MODULE_1__brick__["a" /* default */](context);


  return objects;
};

/* harmony default export */ __webpack_exports__["a"] = (initializeSuite);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class Brick {
  constructor(context) {
    this.state = {
      image: new Image(),
    };
    this.context = context;

    this.initialize();
    this.render = this.render.bind(this);
  }

  initialize() {
    this.state.image.src =
      "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  }

  render() {
    this.context.clearRect(0, CANVAS_HEIGHT - (2 * BRICK_LENGTH),
    CANVAS_WIDTH, (2 * BRICK_LENGTH));


    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 20; x++) {
        this.context.drawImage(this.state.image,
          x * BRICK_LENGTH, CANVAS_HEIGHT - (2 * BRICK_LENGTH) + (y * BRICK_LENGTH),
          BRICK_LENGTH, BRICK_LENGTH);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Brick);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map