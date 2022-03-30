/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/index.js":
/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_stage_background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/stage-background */ \"./scripts/modules/stage-background.js\");\n/* harmony import */ var _modules_sagat_states_standard_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sagat-states/standard-states */ \"./scripts/modules/sagat-states/standard-states.js\");\n//IMPORTS\n\n //CANVAS\n\nvar myCanvas = document.querySelector('#my-canvas');\nvar ctx = myCanvas.getContext('2d'); //INSTANCES\n\nvar stageBackground = new _modules_stage_background__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar standardStates = new _modules_sagat_states_standard_states__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nstageBackground.init();\nstandardStates.init(); //ANIMATION LOOP\n\nvar animationLoop = function animationLoop() {\n  stageBackground.animate(ctx, standardStates.cX);\n  standardStates.animate(ctx, stageBackground.transition); // ctx.fillStyle = '#000';\n  // ctx.fillRect(0, (132 + 75), 300, 2);\n  // ctx.fillRect(42, 0, 2, 300);\n\n  requestAnimationFrame(animationLoop);\n};\n\nanimationLoop();\n\n//# sourceURL=webpack://stf2-minigame/./scripts/index.js?");

/***/ }),

/***/ "./scripts/modules/sagat-states/standard-states.js":
/*!*********************************************************!*\
  !*** ./scripts/modules/sagat-states/standard-states.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StandardStates)\n/* harmony export */ });\n/* harmony import */ var _assets_images_sagat_sprite_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../../assets/images/sagat_sprite.png */ \"./assets/images/sagat_sprite.png\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\nvar sourceImg = new Image();\nsourceImg.src = _assets_images_sagat_sprite_png__WEBPACK_IMPORTED_MODULE_0__;\n\nvar StandardStates = /*#__PURE__*/function () {\n  function StandardStates() {\n    _classCallCheck(this, StandardStates);\n\n    this.sourceImg = sourceImg;\n    this.state = {\n      currentState: 'idle',\n      nextState: 'idle'\n    };\n    this.sX = [0, 60, 120, 180];\n    this.sY = [0, 0, 0, 0];\n    this.sW = 60;\n    this.sH = 132;\n    this.cX = 30;\n    this.cY = 80;\n    this.cW = 60;\n    this.cH = 132;\n    this.position = 30;\n    this.minFrame = 0;\n    this.maxFrame = 4;\n    this.animationActive = true;\n    this.backgroundTransition = null;\n    this.FPS = 0;\n    this.maxFPS = 6;\n    this.keyPressed = false;\n    this.lockedControls = false;\n    this.timeout = null;\n  } //ANIMATIONS\n\n\n  _createClass(StandardStates, [{\n    key: \"animate\",\n    value: function animate(ctx, backgroundTransition) {\n      this.backgroundTransition = backgroundTransition; //console.log(this.state)\n\n      this.checkState();\n      ctx.drawImage(this.sourceImg, this.sX[this.minFrame], this.sY[this.minFrame], this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);\n      this.FPS++;\n    }\n  }, {\n    key: \"checkState\",\n    value: function checkState() {\n      if (this.state.currentState === 'idle') {\n        this.setIdle();\n      } else if (this.state.currentState === 'leftMovement') {\n        this.setLeftMovement();\n      } else if (this.state.currentState === 'rightMovement') {\n        this.setRightMovement();\n      } else if (this.state.currentState === 'jump') {\n        this.setJump();\n\n        if (this.state.currentState === 'jump' && this.state.direction === 'rightMovement') {\n          this.fixRightMovement();\n        } else if (this.state.currentState === 'jump' && this.state.direction === 'leftMovement') {\n          this.fixLeftMovement();\n        }\n      } else if (this.state.currentState === 'crouch') {\n        this.setCrouch();\n      }\n    }\n  }, {\n    key: \"updateFrame\",\n    value: function updateFrame() {\n      var maxFPSReached = this.FPS % this.maxFPS === 0;\n\n      if (maxFPSReached) {\n        this.minFrame = (this.minFrame + 1) % this.maxFrame;\n      }\n    }\n  }, {\n    key: \"resetDefault\",\n    value: function resetDefault() {\n      if (this.lockedControls && this.state.nextState === 'idle') {\n        this.init();\n        this.lockedControls = false;\n      }\n\n      this.position = this.state.currentState === 'crouch' ? this.position : this.cX;\n      this.state = {\n        currentState: 'idle',\n        nextState: 'idle'\n      };\n      this.animationActive = false;\n      this.maxFrame = 4;\n      this.keyPressed = false;\n    } //STATES\n    //Idle\n\n  }, {\n    key: \"setIdle\",\n    value: function setIdle() {\n      if (!this.animationActive) {\n        this.sX = [0, 60, 120, 180];\n        this.sY = [0, 0, 0, 0];\n        this.animationActive = true;\n      }\n\n      this.updateFrame();\n      this.fixIdlePosition();\n    }\n  }, {\n    key: \"fixIdlePosition\",\n    value: function fixIdlePosition() {\n      switch (this.minFrame) {\n        case 0:\n          this.cX = this.position;\n          this.cY = 80;\n          break;\n\n        case 1:\n          this.cX = this.position + 1;\n          this.cY = 80;\n          break;\n\n        case 2:\n          this.cX = this.position + 2;\n          this.cY = 80;\n          break;\n\n        case 3:\n          this.cX = this.position + 3;\n          this.cY = 80;\n          break;\n      }\n    } //leftMovement\n\n  }, {\n    key: \"setLeftMovement\",\n    value: function setLeftMovement() {\n      if (!this.keyPressed) {\n        this.sX = [246, 305, 366, 426, 486, 545];\n        this.sY = [0, 0, 0, 0, 0, 0];\n        this.minFrame = 0;\n        this.maxFrame = 6;\n        this.keyPressed = true;\n      }\n\n      this.fixLeftMovement();\n      this.updateFrame();\n    }\n  }, {\n    key: \"fixLeftMovement\",\n    value: function fixLeftMovement() {\n      if (this.cX > 0 && !this.backgroundTransition.itsTransition) {\n        this.cX -= 2;\n      }\n    } //rightMovement\n\n  }, {\n    key: \"setRightMovement\",\n    value: function setRightMovement() {\n      if (!this.keyPressed) {\n        this.sX = [246, 305, 366, 426, 486, 545];\n        this.sY = [0, 0, 0, 0, 0, 0];\n        this.maxFrame = 6;\n        this.keyPressed = true;\n      }\n\n      this.updateFrame();\n      this.fixRightMovement();\n    }\n  }, {\n    key: \"fixRightMovement\",\n    value: function fixRightMovement() {\n      if (this.cX < 360 - 60 && !this.backgroundTransition.itsTransition) {\n        this.cX += 2;\n      }\n    } //jump\n\n  }, {\n    key: \"setJump\",\n    value: function setJump() {\n      if (!this.keyPressed) {\n        this.sX = [610, 671, 721, 772];\n        this.sY = [0, 0, 0, 0];\n        this.minFrame = 0;\n        this.maxFrame = 4;\n        this.keyPressed = true;\n      }\n\n      this.fixJumpPosition();\n    }\n  }, {\n    key: \"fixJumpPosition\",\n    value: function fixJumpPosition() {\n      var _this = this;\n\n      if (this.cY === 80 && this.minFrame === 0) {\n        this.updateFrame();\n      } else if (this.minFrame === 1 && this.cY > 62) {\n        this.cY -= 7;\n\n        if (this.cY <= 62) {\n          this.minFrame++;\n        }\n      } else if (this.minFrame === 2 && this.cY > 0) {\n        this.cY -= this.state.velocity;\n        this.state.velocity -= this.state.gravity;\n\n        if (this.cY <= 6) {\n          this.minFrame++;\n        }\n      } else if (this.minFrame === 3 && this.minFrame > 0) {\n        this.cY -= this.state.velocity;\n        this.state.velocity -= this.state.gravity;\n\n        if (this.cY >= 80) {\n          this.minFrame = 0;\n          setTimeout(function () {\n            _this.state.nextState = 'idle';\n\n            _this.resetDefault();\n          }, 50);\n        }\n      }\n    } //crouch\n\n  }, {\n    key: \"setCrouch\",\n    value: function setCrouch() {\n      if (!this.keyPressed) {\n        this.sX = [831, 890];\n        this.sY = [0, 0];\n        this.minFrame = 0;\n        this.maxFrame = 2;\n        this.keyPressed = true;\n      }\n\n      this.fixCrouchPosition();\n    }\n  }, {\n    key: \"fixCrouchPosition\",\n    value: function fixCrouchPosition() {\n      switch (this.minFrame) {\n        case 0:\n          this.cX = this.position + 3;\n          this.updateFrame();\n          break;\n\n        case 1:\n          this.cX = this.position + 5;\n          break;\n      }\n    } //ADD CONTROLS\n\n  }, {\n    key: \"addControls\",\n    value: function addControls() {\n      var controlButtons = document.querySelectorAll('[data-js=\"control-buttons\"]');\n      controlButtons.forEach(this.addButtons);\n      console.log('add');\n      document.addEventListener('keydown', this.checkKey);\n      document.addEventListener('keyup', this.checkKey);\n    }\n  }, {\n    key: \"addButtons\",\n    value: function addButtons(button) {\n      button.addEventListener('touchstart', this.checkButton);\n      button.addEventListener('touchend', this.checkButton);\n    } //REMOVE CONTROLS\n\n  }, {\n    key: \"removeControls\",\n    value: function removeControls() {\n      if (!this.lockedControls) {\n        var controlButtons = document.querySelectorAll('[data-js=\"control-buttons\"]');\n        controlButtons.forEach(this.removeButtons);\n        console.log('removido');\n        document.removeEventListener('keydown', this.checkKey);\n        document.removeEventListener('keyup', this.checkKey);\n        this.lockedControls = true;\n      }\n    }\n  }, {\n    key: \"removeButtons\",\n    value: function removeButtons(button) {\n      button.removeEventListener('touchstart', this.checkButton);\n      button.removeEventListener('touchend', this.checkButton);\n    } //CONTROLS MAP\n\n  }, {\n    key: \"checkKey\",\n    value: function checkKey(event) {\n      var _this2 = this;\n\n      var keyDown = event.type === 'keydown';\n      var keyUp = event.type === 'keyup';\n      var key = event.key; //clearTimeout(this.timeout);\n\n      console.log(this.state);\n\n      if (keyDown && key != 'ArrowUp') {\n        this.mapMovementList(key);\n      } else if (keyDown && key === 'ArrowUp') {\n        this.mapMovementList(key);\n\n        if (this.state.direction === 'static') {\n          setTimeout(function () {\n            return _this2.removeControls();\n          }, 130);\n        }\n      } else if (keyDown && this.state.movement === 'LR') {\n        console.log('ta funcjonado'); //this.timeout\n      } else if (keyUp && this.state.nextState === 'idle') {\n        this.resetDefault(); //console.log(this.state.nextState === 'idle')\n        // this.timeout = setTimeout(() => {\n        //   this.resetDefault();\n        // }, 120)\n      }\n    }\n  }, {\n    key: \"checkButton\",\n    value: function checkButton(event) {\n      var _this3 = this;\n\n      var touchStart = event.type === 'touchstart';\n      var touchEnd = event.type === 'touchend';\n      var button = event.target.parentNode.classList[1];\n\n      if (touchStart && button != 'ArrowUp') {\n        this.mapMovementList(button);\n      } else if (touchStart && button === 'ArrowUp') {\n        this.mapMovementList(button);\n\n        if (this.state.direction === 'static') {\n          setTimeout(function () {\n            return _this3.removeControls();\n          }, 130);\n        }\n      } else if (touchEnd && this.state.nextState === 'idle') {\n        this.resetDefault();\n      }\n    } //MOVEMENT LIST\n\n  }, {\n    key: \"mapMovementList\",\n    value: function mapMovementList(button) {\n      if (button === 'ArrowLeft' && this.state.currentState === 'jump') {\n        this.state.direction = 'leftMovement';\n        console.log('ativou');\n      } else if (button === 'ArrowRight' && this.state.currentState === 'jump') {\n        this.state.direction = 'rightMovement';\n      } else if (button === 'ArrowLeft') {\n        this.state = {\n          currentState: 'leftMovement',\n          nextState: 'idle',\n          movement: 'LR'\n        };\n      } else if (button === 'ArrowRight') {\n        this.state = {\n          currentState: 'rightMovement',\n          nextState: 'idle',\n          movement: 'LR'\n        };\n      } else if (button === 'ArrowUp') {\n        this.state = {\n          currentState: 'jump',\n          direction: 'static',\n          nextState: 'fall',\n          gravity: 0.36,\n          velocity: 6\n        };\n      } else if (button === 'ArrowDown') {\n        this.state = {\n          currentState: 'crouch',\n          nextState: 'idle'\n        };\n      }\n    } //CONFIGS\n\n  }, {\n    key: \"bindEvents\",\n    value: function bindEvents() {\n      this.checkKey = this.checkKey.bind(this);\n      this.addButtons = this.addButtons.bind(this);\n      this.checkButton = this.checkButton.bind(this);\n      this.removeButtons = this.removeButtons.bind(this);\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      this.bindEvents();\n      this.addControls();\n    }\n  }]);\n\n  return StandardStates;\n}();\n\n\n\n//# sourceURL=webpack://stf2-minigame/./scripts/modules/sagat-states/standard-states.js?");

/***/ }),

/***/ "./scripts/modules/stage-background.js":
/*!*********************************************!*\
  !*** ./scripts/modules/stage-background.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StageBackground)\n/* harmony export */ });\n/* harmony import */ var _sagat_states_standard_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sagat-states/standard-states */ \"./scripts/modules/sagat-states/standard-states.js\");\n/* harmony import */ var _assets_images_blanka_stage_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../../assets/images/blanka_stage.png */ \"./assets/images/blanka_stage.png\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n//JS IMPORTS\n //ASSET MODULES IMPORTS\n\n\nvar sourceImg = new Image();\nsourceImg.src = _assets_images_blanka_stage_png__WEBPACK_IMPORTED_MODULE_1__; //INTANCES\n\nvar StageBackground = /*#__PURE__*/function () {\n  function StageBackground() {\n    _classCallCheck(this, StageBackground);\n\n    this.standardStates = new _sagat_states_standard_states__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.sourceImg = sourceImg;\n    this.sX = 621 / 2 - 621 / 2 / 2;\n    this.sY = 0;\n    this.sW = 621 / 2;\n    this.sH = 224;\n    this.cX = 0;\n    this.cY = 0;\n    this.cW = 360;\n    this.cH = 224;\n    this.FPS = 0;\n    this.maxFPS = 3;\n    this.itsHoldingTouch = false;\n    this.timer = null;\n    this.transition = {\n      direction: null,\n      itsTransition: false\n    };\n    this.characterPosition = null;\n  } //ANIMATIONS\n\n\n  _createClass(StageBackground, [{\n    key: \"animate\",\n    value: function animate(ctx, characterPosition) {\n      this.characterPosition = characterPosition;\n      this.checkTransition();\n      ctx.drawImage(this.sourceImg, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);\n      this.FPS++;\n    }\n  }, {\n    key: \"checkTransition\",\n    value: function checkTransition() {\n      switch (this.transition.direction) {\n        case 'toLeft':\n          this.transitionStageToLeft();\n          break;\n\n        case 'toRight':\n          this.transitionStageToRight();\n          break;\n      }\n    }\n  }, {\n    key: \"transitionStageToLeft\",\n    value: function transitionStageToLeft() {\n      if (this.sX > 0 && this.characterPosition <= 15) {\n        this.sX -= 1;\n        this.transition.itsTransition = true;\n      }\n    }\n  }, {\n    key: \"transitionStageToRight\",\n    value: function transitionStageToRight() {\n      if (this.sX < 360 - 56 && this.characterPosition >= 280) {\n        this.sX += 1;\n        this.transition.itsTransition = true;\n      }\n    } //ADD CONTROLS\n\n  }, {\n    key: \"addControls\",\n    value: function addControls() {\n      var controlButtons = document.querySelectorAll('[data-js=\"control-buttons\"]');\n      controlButtons.forEach(this.addButtons);\n      document.addEventListener('keydown', this.checkKey);\n      document.addEventListener('keyup', this.checkKey);\n    }\n  }, {\n    key: \"addButtons\",\n    value: function addButtons(button) {\n      button.addEventListener('touchstart', this.checkButton);\n      button.addEventListener('touchmove', this.checkButton);\n      button.addEventListener('touchend', this.checkButton);\n    } //CONTROLS MAP\n\n  }, {\n    key: \"checkKey\",\n    value: function checkKey(event) {\n      var keyDown = event.type === 'keydown';\n      var keyUp = event.type === 'keyup';\n\n      if (keyDown) {\n        this.mapTransitionDirection(event.key);\n      } else if (keyUp) {\n        this.transition.direction = null;\n        this.transition.itsTransition = false;\n      }\n    }\n  }, {\n    key: \"checkButton\",\n    value: function checkButton(event) {\n      var touchStart = event.type === 'touchstart';\n      var touchMove = event.type === 'touchmove';\n      var touchEnd = event.type === 'touchend';\n      var button = event.target.parentNode.classList[1];\n\n      if (touchStart) {\n        this.mapTransitionDirection(button);\n      } else if (touchEnd) {\n        this.transition.direction = null;\n        this.transition.itsTransition = false;\n      }\n    }\n  }, {\n    key: \"mapTransitionDirection\",\n    value: function mapTransitionDirection(button) {\n      switch (button) {\n        case 'ArrowLeft':\n          this.transition.direction = 'toLeft';\n          break;\n\n        case 'ArrowRight':\n          this.transition.direction = 'toRight';\n          break;\n      }\n    } //CONFIGS\n\n  }, {\n    key: \"bindEvents\",\n    value: function bindEvents() {\n      this.checkKey = this.checkKey.bind(this);\n      this.addButtons = this.addButtons.bind(this);\n      this.checkButton = this.checkButton.bind(this);\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      this.bindEvents();\n      this.addControls();\n    }\n  }]);\n\n  return StageBackground;\n}();\n\n\n\n//# sourceURL=webpack://stf2-minigame/./scripts/modules/stage-background.js?");

/***/ }),

/***/ "./assets/images/blanka_stage.png":
/*!****************************************!*\
  !*** ./assets/images/blanka_stage.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"asset-modules/images/9b0201b69f69f00dbf59.png\";\n\n//# sourceURL=webpack://stf2-minigame/./assets/images/blanka_stage.png?");

/***/ }),

/***/ "./assets/images/sagat_sprite.png":
/*!****************************************!*\
  !*** ./assets/images/sagat_sprite.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"asset-modules/images/7b60236c64712a72ca4e.png\";\n\n//# sourceURL=webpack://stf2-minigame/./assets/images/sagat_sprite.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/index.js");
/******/ 	
/******/ })()
;