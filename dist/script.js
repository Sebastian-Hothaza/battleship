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

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GAMEBOARD_MAX_X: () => (/* binding */ GAMEBOARD_MAX_X),\n/* harmony export */   GAMEBOARD_MAX_Y: () => (/* binding */ GAMEBOARD_MAX_Y),\n/* harmony export */   gameboardFactory: () => (/* binding */ gameboardFactory)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n// Gameboards should keep track of missed attacks so they can display them properly.\n\n\n\n\n\n\n//NOTE: Origin being taken as bottom left corner\nconst GAMEBOARD_MAX_X = 9;\nconst GAMEBOARD_MAX_Y = 9;\n\n// ONLY board has concept of where a ship is\nconst gameboardFactory = () => {\n\n    // Gameboard needs to know which ship occupies which spots\n    let ships = []; // Tracks ships placed on the board. \n    let missed = []; // Array of missed shots\n\n    \n    // Given a posn and direction, attempts to place a ship of specified size. Returns true if placement is valid, false otherwise\n    // Dir is given as oneOf(U,D,L,R). Ie. placeShip((0,0), R, 5) would be a ship with head at origin and spanning to right 5 blocks\n    function placeShip(posn, dir, size){\n        // Check that the posn is valid\n        if (posn.x < 0 || posn.y < 0 || posn.x > GAMEBOARD_MAX_X || posn.y > GAMEBOARD_MAX_Y) return false;\n\n        // Check that ship placement would not spill outside gameboard\n        switch (dir){\n            case 'L':\n                if (posn.x - size < 0) return false;\n                break;\n            case 'R':\n                if (posn.x + size > GAMEBOARD_MAX_X) return false;\n                break;\n            case 'U':\n                if (posn.y + size > GAMEBOARD_MAX_Y) return false;\n                break;\n            case 'D':\n                if (posn.y - size < 0) return false;\n                break;\n            default:\n                return false;\n        }\n\n        // Checking that ship playerplacement does not overlap with other ships\n        const spacesOccupied = getShipSpaces(posn, dir, size);\n        // Check that none of these spaces occupied coincide with any of spaces occupied by current ships\n        \n        for (let i=0; i<ships.length; i++){ // Go thru each ship\n            for (let j=0; j<ships[i][1].length; j++){ // Go thru each ships occupied spaces array\n                for (let k=0; k<spacesOccupied.length; k++){ // For each of the ships coordinates, we check against each coordinate in the proposed ship\n                    if (spacesOccupied[k].x === ships[i][1][j].x && spacesOccupied[k].y === ships[i][1][j].y ) return false;\n                }\n            }\n        }\n\n\n    \n        // Creating and placing the ship\n        ships.push( [(0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(size), spacesOccupied] ); \n       \n        \n      \n        return true;\n    }\n\n    // Returns an array of posn's corresponding to posns which would be occupied by the specified ship\n    function getShipSpaces(head, dir, size){\n        let result = [head]\n\n        switch(dir){\n            case 'L':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x-i,head.y))\n                }\n                break;\n            case 'R':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x+i,head.y))\n                }\n                break;\n            case 'U':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x,head.y+i))\n                }\n                break;\n            case 'D':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x,head.y-i))\n                }\n                break;\n            default:\n                //TODO, throw error?\n            \n        }\n        return result;\n    }\n\n    // Prints all ships and their locations to console\n    function printShips(){\n        for (let i=0; i<ships.length; i++){\n            console.log(\"Ship \",i+1,\" has size \",ships[i][0].size)\n            let coords = \"\"\n            for (let j=0; j<ships[i][1].length; j++){\n                coords+=\"(\" + (ships[i][1][j].x) + ',' + (ships[i][1][j].y) + ') '\n            }\n            console.log(\"It occupies the following spaces: \", coords)\n        }\n    }\n\n    // Returns an array of ship objects\n    function getShips(){\n        let result = [];\n        for (let i=0; i<ships.length; i++){\n            result.push(ships[i][0]);\n        }\n        return result;\n    }\n\n    //determines whether attack hit a ship, then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot for the gameboard\n    //return the ship if the attack hit, else returns false\n    function receiveAttack(target){\n        for (let i=0; i<ships.length; i++){\n            for (let j=0; j<ships[i][1].length; j++){\n                if (ships[i][1][j].x === target.x && ships[i][1][j].y === target.y){\n                    ships[i][0].hit();\n                    return ships[i][0];\n                }\n            }\n        }\n        missed.push(target)\n        return false;\n    }\n\n    // Returns true if all ships on board are sunk\n    function allSunk(){\n        for (let i=0; i<ships.length; i++){\n            if (ships[i][0].isSunk() === false) return false;\n        }\n        return true;\n    }\n\n    return{\n        placeShip, receiveAttack, getShips, allSunk, missed\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n// const player = require('./player.js')\n// const gameboard = require('./gameboard.js')\n// const posn = require('./posn.js')\n\n\n\n\n// Creating the gameboards and players\nconst person = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)();\nconst computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)();\n\nconst personGB = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__.gameboardFactory)();\nconst computerGB = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__.gameboardFactory)();\n\n\n\n\nloadBoards();\n\nif (runGame() === person){\n    console.log('You win!')\n} else {\n    console.log('You lose')\n}\n\nfunction loadBoards(){\n    // Placing the computer ships\n    computerGB.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(0,0),'R',5);\n\n    // Placing the player ships\n    personGB.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(1,1), 'R', 5);\n}\n\n// Begin game loop (runs until either gameboard reports all ships sunk; in that case other player wins)\n// Returns winner\nfunction runGame(){\n    console.log(\"BEGIN GAME LOOP, person goes first\")\n    let personTurn = true;\n    let GB; //Represent the GB the attack occurs on\n    let target;\n\n\n\n    while (personGB.allSunk() !== true && computerGB.allSunk() !== true){\n        // setup\n        if (personTurn){\n            GB = computerGB;\n            //ISSUE: User should not be able to attack same spot. Enforce in DOM\n            let xy = prompt(\"enter xy to attack\"); \n            target = (0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(parseInt(xy/10), xy%10);\n        } else {\n            GB = personGB;\n            target = computer.getRandomTarget();\n        }\n\n        // Processing the move\n        console.log(\"Attack (\", target.x, ',',target.y,')');\n        let shipHit = GB.receiveAttack(target)\n        \n        if (shipHit) {\n            console.log(\"BOOM\");\n            if (shipHit.isSunk()){\n                console.log(\"ship sunk\")\n                if (GB.allSunk() && personTurn) return person; \n                if (GB.allSunk()) return computer; \n            }\n        } else {\n            console.log(\"SPLASH\");\n        }\n        personTurn = !personTurn  // Switch players\n    }\n}\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   playerFactory: () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n\n// const posn = require('./posn.js')\n\n\n\n\nconst playerFactory = () => {\n    let shots = [] //Used by the AI as a way of preventing illegal moves\n\n    // Randomly returns a valid posn to shoot at\n    function getRandomTarget(){\n        while (1){\n            let candidatePosn = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)( Math.floor(Math.random() * (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X+1)),\n                                                Math.floor(Math.random() * (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y+1)));\n        \n            // We've checked candiate posn against all known existing posn\n            if (verifyUnique(candidatePosn)) {\n                shots.push(candidatePosn)\n                return candidatePosn;\n            }\n        }\n    }\n\n    // Verify that the candidate target is unique\n    function verifyUnique(target){\n        for (let i=0; i<shots.length; i++){ \n            if (shots[i].x === target.x && shots[i].y === target.y){ \n                return false;\n            } \n        }\n        return true;\n    }\n\n   \n    return {\n        getRandomTarget, shots  // shots shouldnt really be exported however it is for testing purposes (Jest)\n    }\n}\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/posn.js":
/*!*********************!*\
  !*** ./src/posn.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   posnFactory: () => (/* binding */ posnFactory)\n/* harmony export */ });\n\n\nconst posnFactory = (x, y) => {\n    return{\n        get x(){return x;}, set x(newX){x=newX},\n        get y(){return y;}, set y(newY){y=newY}\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/posn.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shipFactory: () => (/* binding */ shipFactory)\n/* harmony export */ });\n\n\nconst shipFactory = (size) => {\n    let timesHit = 0;\n    \n    function hit(){\n        timesHit++;\n    }\n\n    function isSunk(){\n        return (timesHit >= size)? true:false;\n    }\n\n    return{\n        get size(){return size;}, set size(newSize){size=newSize}, hit, isSunk\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;