/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n// Gameboards should keep track of missed attacks so they can display them properly.\n\nconst ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\")\nconst posn = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\")\n\n//NOTE: Origin being taken as bottom left corner\nconst GAMEBOARD_MAX_X = 9;\nconst GAMEBOARD_MAX_Y = 9;\n\n// ONLY board has concept of where a ship is\nconst gameboardFactory = () => {\n\n    // Gameboard needs to know which ship occupies which spots\n    let ships = []; // Tracks ships placed on the board. \n    let missed = []; // Array of missed shots\n\n    \n    // Given a posn and direction, attempts to place a ship of specified size. Returns true if placement is valid, false otherwise\n    // Dir is given as oneOf(U,D,L,R). Ie. placeShip((0,0), R, 5) would be a ship with head at origin and spanning to right 5 blocks\n    function placeShip(posn, dir, size){\n        // Check that the posn is valid\n        if (posn.x < 0 || posn.y < 0 || posn.x > GAMEBOARD_MAX_X || posn.y > GAMEBOARD_MAX_Y) return false;\n\n        // Check that ship placement would not spill outside gameboard\n        switch (dir){\n            case 'L':\n                if (posn.x - size < 0) return false;\n                break;\n            case 'R':\n                if (posn.x + size > GAMEBOARD_MAX_X) return false;\n                break;\n            case 'U':\n                if (posn.y + size > GAMEBOARD_MAX_Y) return false;\n                break;\n            case 'D':\n                if (posn.y - size < 0) return false;\n                break;\n            default:\n                return false;\n        }\n\n        // Checking that ship playerplacement does not overlap with other ships\n        const spacesOccupied = getShipSpaces(posn, dir, size);\n        // Check that none of these spaces occupied coincide with any of spaces occupied by current ships\n        \n        for (let i=0; i<ships.length; i++){ // Go thru each ship\n            for (let j=0; j<ships[i][1].length; j++){ // Go thru each ships occupied spaces array\n                for (let k=0; k<spacesOccupied.length; k++){ // For each of the ships coordinates, we check against each coordinate in the proposed ship\n                    if (spacesOccupied[k].x === ships[i][1][j].x && spacesOccupied[k].y === ships[i][1][j].y ) return false;\n                }\n            }\n        }\n\n\n    \n        // Creating and placing the ship\n        ships.push( [ship.shipFactory(size), spacesOccupied] ); \n       \n        \n      \n        return true;\n    }\n\n    // Returns an array of posn's corresponding to posns which would be occupied by the specified ship\n    function getShipSpaces(head, dir, size){\n        let result = [head]\n\n        switch(dir){\n            case 'L':\n                for (let i=1; i<size; i++){\n                    result.push(posn.posnFactory(head.x-i,head.y))\n                }\n                break;\n            case 'R':\n                for (let i=1; i<size; i++){\n                    result.push(posn.posnFactory(head.x+i,head.y))\n                }\n                break;\n            case 'U':\n                for (let i=1; i<size; i++){\n                    result.push(posn.posnFactory(head.x,head.y+i))\n                }\n                break;\n            case 'D':\n                for (let i=1; i<size; i++){\n                    result.push(posn.posnFactory(head.x,head.y-i))\n                }\n                break;\n            default:\n                //TODO, throw error?\n            \n        }\n        return result;\n    }\n\n    // Prints all ships and their locations to console\n    function printShips(){\n        for (let i=0; i<ships.length; i++){\n            console.log(\"Ship \",i+1,\" has size \",ships[i][0].size)\n            let coords = \"\"\n            for (let j=0; j<ships[i][1].length; j++){\n                coords+=\"(\" + (ships[i][1][j].x) + ',' + (ships[i][1][j].y) + ') '\n            }\n            console.log(\"It occupies the following spaces: \", coords)\n        }\n    }\n\n    // Returns an array of ship objects\n    function getShips(){\n        let result = [];\n        for (let i=0; i<ships.length; i++){\n            result.push(ships[i][0]);\n        }\n        return result;\n    }\n\n    //determines whether attack hit a ship, then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot for the gameboard\n    function receiveAttack(target){\n        for (let i=0; i<ships.length; i++){\n            for (let j=0; j<ships[i][1].length; j++){\n                if (ships[i][1][j].x === target.x && ships[i][1][j].y === target.y){\n                    ships[i][0].hit();\n                    return;\n                }\n            }\n        }\n        missed.push(target)\n    }\n\n    // Returns true if all ships on board are sunk\n    function allSunk(){\n        for (let i=0; i<ships.length; i++){\n            if (ships[i][0].isSunk() === false) return false;\n        }\n        return true;\n    }\n\n    return{\n        placeShip, receiveAttack, getShips, allSunk, missed\n    }\n}\n\n\nmodule.exports = { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y, gameboardFactory }\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const player = __webpack_require__(/*! ./player.js */ \"./src/player.js\")\nconst ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\")\nconst gameboard = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\")\nconst posn = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\")\n\n\n// Creating the gameboards and players\nconst person = player.playerFactory();\nconst computer = player.playerFactory();\n\nconst personGB = gameboard.gameboardFactory();\nconst computerGB = gameboard.gameboardFactory();\n\n// // Placing a computer ship at the origin\nconst origin = posn.posnFactory(0,0);\ncomputerGB.placeShip(origin,'R',5);\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const gameboard = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\")\nconst posn = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\")\n\nconst playerFactory = () => {\n    let shots = []\n\n    // Randomly returns a valid posn to shoot at\n    function getRandomTarget(){\n        while (1){\n            let candidatePosn = posn.posnFactory( Math.floor(Math.random() * (gameboard.GAMEBOARD_MAX_X+1)),\n                                                Math.floor(Math.random() * (gameboard.GAMEBOARD_MAX_X+1)));\n            let unique = true; // We assume that the generated candidate is unique     \n\n            // Verify that the candidate posn is unique\n            for (let i=0; i<shots.length; i++){ \n                if (shots[i].x === candidatePosn.x && shots[i].y === candidatePosn.y){ \n                    unique = false;\n                    break;\n                } \n            }\n            // We've checked candiate posn against all known existing posn\n            if (unique) {\n                shots.push(candidatePosn)\n                return candidatePosn;\n            }\n        }\n    }\n\n    return {\n        shots, getRandomTarget\n    }\n}\n\nmodule.exports = { playerFactory }\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/posn.js":
/*!*********************!*\
  !*** ./src/posn.js ***!
  \*********************/
/***/ ((module) => {

eval("const posnFactory = (x, y) => {\n    return{\n        get x(){return x;}, set x(newX){x=newX},\n        get y(){return y;}, set y(newY){y=newY}\n    }\n}\n\n\nmodule.exports = { posnFactory }\n\n//# sourceURL=webpack://battleship/./src/posn.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("\n\nconst shipFactory = (size) => {\n    let timesHit = 0;\n    \n    function hit(){\n        timesHit++;\n    }\n\n    function isSunk(){\n        return (timesHit >= size)? true:false;\n    }\n\n    return{\n        get size(){return size;}, set size(newSize){size=newSize}, hit, isSunk\n    }\n}\n\n\nmodule.exports = { shipFactory }\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;