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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GAMEBOARD_MAX_X: () => (/* binding */ GAMEBOARD_MAX_X),\n/* harmony export */   GAMEBOARD_MAX_Y: () => (/* binding */ GAMEBOARD_MAX_Y),\n/* harmony export */   gameboardFactory: () => (/* binding */ gameboardFactory)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n// Gameboards should keep track of missed attacks so they can display them properly.\n\n\n\n\n\n\n//NOTE: Origin being taken as bottom left corner\nconst GAMEBOARD_MAX_X = 9;\nconst GAMEBOARD_MAX_Y = 9;\n\n// ONLY board has concept of where a ship is\nconst gameboardFactory = () => {\n\n    // Gameboard needs to know which ship occupies which spots\n    let ships = []; // Tracks ship objects placed on the board. Ie. ships[0] = [ship obj, array of posns occupied by ship object]\n    let missed = []; // Array of missed shot posn's\n    let hits = []; // Array of hit shot posn's\n\n    // Given a posn and direction, attempts to place a ship of specified size. Returns true and places ship if placement is valid, false otherwise\n    // Dir is given as oneOf(U,D,L,R). Ie. placeShip((0,0), R, 5) would be a ship with head at origin and spanning to right 5 blocks\n    function placeShip(posn, dir, size){\n        // Check that the posn is valid\n        if (posn.x < 0 || posn.y < 0 || posn.x > GAMEBOARD_MAX_X || posn.y > GAMEBOARD_MAX_Y) return false;\n\n        // Check that ship placement would not spill outside gameboard\n        switch (dir){\n            case 'L':\n                if (posn.x - size < 0) return false;\n                break;\n            case 'R':\n                if (posn.x + size > GAMEBOARD_MAX_X) return false;\n                break;\n            case 'U':\n                if (posn.y + size > GAMEBOARD_MAX_Y) return false;\n                break;\n            case 'D':\n                if (posn.y - size < 0) return false;\n                break;\n            default:\n                return false;\n        }\n\n        // Checking that ship playerplacement does not overlap with other ships\n        const spacesOccupied = getSpacesOccupiedByShip(posn, dir, size);\n\n        // Check that none of these spaces occupied coincide with any of spaces occupied by current ships\n        for (let i=0; i<ships.length; i++){ // Go thru each ship\n            for (let j=0; j<ships[i][1].length; j++){ // Go thru each ships occupied spaces array\n                for (let k=0; k<spacesOccupied.length; k++){ // For each of the ships coordinates, we check against each coordinate in the proposed ship\n                    if (spacesOccupied[k].x === ships[i][1][j].x && spacesOccupied[k].y === ships[i][1][j].y ) return false;\n                }\n            }\n        }\n\n        // Creating and placing the ship\n        ships.push( [(0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.shipFactory)(size), spacesOccupied] ); \n       \n        return true;\n    }\n\n    //determines whether attack hit a ship, then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot for the gameboard\n    //return the ship if the attack hit, else returns false\n    function receiveAttack(target){\n        for (let i=0; i<ships.length; i++){\n            for (let j=0; j<ships[i][1].length; j++){\n                if (ships[i][1][j].x === target.x && ships[i][1][j].y === target.y){\n                    ships[i][0].hit();\n                    hits.push(target);\n                    return ships[i][0];\n                }\n            }\n        }\n        missed.push(target)\n        return false;\n    }\n\n    // Returns true if all ships on board are sunk\n    function allSunk(){\n        for (let i=0; i<ships.length; i++){\n            if (ships[i][0].isSunk() === false) return false;\n        }\n        return true;\n    }\n\n    // Returns an array of posns corresponding to spaces occupied by ships\n    // Called in page.js by drawPersonShip\n    function getOccupiedSpaces(){\n        let result = [];\n        for (let i=0; i<ships.length; i++){\n            for (let j=0; j<ships[i][1].length; j++){\n                result.push(ships[i][1][j]);\n            }\n        }\n        return result;\n    }\n\n    // Returns an array of posn's corresponding to posns which would be occupied by the specified ship\n    // Used internally by placeShip\n    function getSpacesOccupiedByShip(head, dir, size){\n        let result = [head]\n\n        switch(dir){\n            case 'L':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x-i,head.y))\n                }\n                break;\n            case 'R':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x+i,head.y))\n                }\n                break;\n            case 'U':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x,head.y+i))\n                }\n                break;\n            case 'D':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(head.x,head.y-i))\n                }\n                break;\n            default:\n                //TODO, throw error?\n            \n        }\n        return result;\n    }\n\n    return{\n        placeShip, receiveAttack, allSunk, getOccupiedSpaces, missed, hits\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   computer: () => (/* binding */ computer),\n/* harmony export */   person: () => (/* binding */ person),\n/* harmony export */   play: () => (/* binding */ play)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page.js */ \"./src/page.js\");\n\n\n\n\n\n\n// Creating the players\nconst person = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)();\nconst computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)();\n(0,_page_js__WEBPACK_IMPORTED_MODULE_2__.loadSite)();\nloadBoards();\n\n// Loads the ships onto the boards \nfunction loadBoards(){\n    // Placing the computer ships\n    computer.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(0,0),'R',5);\n    // placeComputerShips(sizes) // Randomly places computer ships. Sizes is array of ship sizes\n\n    // Placing the player ships\n    person.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(1,1), 'R', 8);\n\n    person.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(1,3), 'R', 8);\n\n    person.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(1,5), 'R', 8);\n    \n\n    (0,_page_js__WEBPACK_IMPORTED_MODULE_2__.drawPersonShip)(); // Draws the persons ships\n}\n\n// Called by click-listener when person clicks hostile cell\n// Verifies move is valid and calls processAttack\nfunction play(move){\n    // Verify making a move is permitted\n    // TODO: Game allows a move even after game over event or before ships are setup\n    if (false) {}\n    \n    // Verify target hasn't been shot at before\n    // TODO: Game allows clicking any spot\n    if (false) {}\n    \n    \n\n    // Process the plays\n    processAttack(computer.board, (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(move%10, 9 - parseInt(move/10)));\n\n    // TODO: Add wait timer?\n    processAttack(person.board, computer.getRandomTarget(person.board)); //TODO: Add AI inteligence\n\n    \n\n\n    // Check if someone won\n    // TODO: Game is in infinite loop\n\n}\n\n// Processes an attack and updates the DOM. Must be a legal move.\n// Called by play\nfunction processAttack(GB, target){\n    // console.log(\"Attack (\", target.x, ',',target.y,')');\n        let shipHit = GB.receiveAttack(target)\n        \n        if (shipHit) {\n            // console.log(\"BOOM\");\n            (0,_page_js__WEBPACK_IMPORTED_MODULE_2__.markCell)(GB,'hit', (((9-target.y)*10) + target.x));\n            if (shipHit.isSunk()){\n                console.log(\"ship sunk\")               \n            }\n        } else {\n            // console.log(\"SPLASH\");\n            (0,_page_js__WEBPACK_IMPORTED_MODULE_2__.markCell)(GB,'miss', (((9-target.y)*10) + target.x));\n\n        }\n        //updateBoards(); // DOM\n}\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawPersonShip: () => (/* binding */ drawPersonShip),\n/* harmony export */   loadSite: () => (/* binding */ loadSite),\n/* harmony export */   markCell: () => (/* binding */ markCell)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ \"./src/main.js\");\n\n\n\n\n\n\nfunction loadSite(){\n    const content = document.querySelector('#content');\n    content.appendChild(createHeader());\n\n    const opponentLabel = document.createElement('div');\n    opponentLabel.classList.add('label');\n    opponentLabel.textContent = \"OPPONENT\";\n    content.appendChild(opponentLabel);\n\n    const youLabel = document.createElement('div');\n    youLabel.classList.add('label');\n    youLabel.textContent = \"YOU\";\n    content.appendChild(youLabel);\n\n    const computerGrid = createGrid();\n    computerGrid.id = 'computerGrid';\n    content.appendChild(computerGrid);\n    // Attach listeners to computer grid\n    let cells = computerGrid.children;\n    for (let childIDX=0; childIDX<cells.length; childIDX++){\n        cells[childIDX].addEventListener('mousedown', (e) => {\n            e.preventDefault();\n            (0,_main__WEBPACK_IMPORTED_MODULE_1__.play)(childIDX);\n        });\n    }\n    \n   \n\n    const personGrid = createGrid();\n    personGrid.id = 'personGrid';\n    content.appendChild(personGrid);\n}\n\n// Returns div corresponding to header\nfunction createHeader(){\n    const header = document.createElement('div');\n    header.classList.add('header');\n    header.textContent = \"BATTLESHIP\";\n    return header;\n}\n\n// Returns div corresponding to footer\nfunction createFooter(){\n    const footer = document.createElement('div');\n    footer.classList.add('footer');\n    footer.textContent = \"footer\";\n    return footer;\n}\n\n// Returns div corresponding to a grid\nfunction createGrid(){\n    const grid = document.createElement('div');\n    grid.classList.add('grid')\n\n    // Create cells\n    for (let i=0; i< (_gameboard__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X+1)*(_gameboard__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y+1); i++){\n        const cell = document.createElement('div');\n        cell.classList.add('cell');\n        grid.appendChild(cell);\n    }\n    return grid;\n}\n\n// Updates both gameboards to reflect hits/misses\n// function updateBoards(){\n//     // Should these be moved out so that we aren't redefining them each time we call updateBoards?\n//     const computerCells = document.getElementById('computerGrid').childNodes; // 0 to 99\n//     const personCells = document.getElementById('personGrid').childNodes; \n\n//     // Update computer grid to show misses and hits\n//     for (let i=0; i<computerGB.missed.length; i++){ // go thru missed array (array of posns)\n//         computerCells[(10*(9 - computerGB.missed[i].y) + computerGB.missed[i].x)].classList.add('miss');\n//     }\n//     for (let i=0; i<computerGB.hits.length; i++){ // go thru missed array (array of posns)\n//         computerCells[(10*(9 - computerGB.hits[i].y) + computerGB.hits[i].x)].classList.add('hit');\n//     }\n    \n//     // Update person grid to show misses and hits\n//     for (let i=0; i<personGB.missed.length; i++){ // go thru missed array (array of posns)\n//         personCells[(10*(9 - personGB.missed[i].y) + personGB.missed[i].x)].classList.add('miss');\n//     }\n//     for (let i=0; i<personGB.hits.length; i++){ // go thru missed array (array of posns)\n//         personCells[(10*(9 - personGB.hits[i].y) + personGB.missed[i].x)].classList.add('hit');\n//     } \n// }\n\n\n// Marks miss at a given idx for a given GameBoard\nfunction markCell(GB, type, idx){\n    let cells;\n    if (GB === _main__WEBPACK_IMPORTED_MODULE_1__.person.board){\n        cells = document.getElementById('personGrid').childNodes;\n    } else {\n        cells = document.getElementById('computerGrid').childNodes;\n    }\n    \n    cells[idx].classList.add(type);\n}\n\nfunction drawPersonShip(){\n    const cells = document.getElementById('personGrid').childNodes; \n    // ships is array which keeps track of all ship objects on the board. For each ship we call ships[i][1] which returns array of spaces occupied by that ship\n    const spacesOccupied = _main__WEBPACK_IMPORTED_MODULE_1__.person.board.getOccupiedSpaces(); // array of posns\n    for (let i=0; i<spacesOccupied.length; i++){\n        cells[(10*(9 - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/page.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   playerFactory: () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n\n\n\n\nconst playerFactory = () => {\n    let board = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)(); // Board associated with the player\n\n    // Randomly returns a valid posn to shoot at a targetGB. Used by computer player for generating targets\n    // Calls verifyUnique\n    function getRandomTarget(targetGB){ \n        while (1){\n            let candidatePosn = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)( Math.floor(Math.random() * (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X+1)),\n                                                Math.floor(Math.random() * (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y+1)));\n            if (verifyUnique(candidatePosn, targetGB)) return candidatePosn;\n        }\n    }\n\n    // Verify that the candidate target is a unique shot within targetGB \n    // Called by getRandomTarget\n    function verifyUnique(target, targetGB){\n        let allShots = targetGB.missed.concat(targetGB.hits); //array of posns that\n        for (let i=0; i<allShots.length; i++){ \n            if (allShots[i].x === target.x && allShots[i].y === target.y){ \n                return false;\n            } \n        }\n        return true;\n    }\n   \n    return {\n        getRandomTarget, board\n    }\n}\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shipFactory: () => (/* binding */ shipFactory)\n/* harmony export */ });\n\n\nconst shipFactory = (size) => {\n    let timesHit = 0;\n    \n    function hit(){\n        timesHit++;\n    }\n\n    function isSunk(){\n        return (timesHit >= size)? true:false;\n    }\n\n    return{\n        get size(){return size;}, set size(newSize){size=newSize}, hit, isSunk\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;