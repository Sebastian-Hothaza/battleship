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

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GAMEBOARD_MAX_X: () => (/* binding */ GAMEBOARD_MAX_X),\n/* harmony export */   GAMEBOARD_MAX_Y: () => (/* binding */ GAMEBOARD_MAX_Y),\n/* harmony export */   shipSizes: () => (/* binding */ shipSizes)\n/* harmony export */ });\n\n\nconst GAMEBOARD_MAX_X = 9;\nconst GAMEBOARD_MAX_Y = 9;\nconst shipSizes = [5,4,3,3,2];\n\n//# sourceURL=webpack://battleship/./src/constants.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   computer: () => (/* binding */ computer),\n/* harmony export */   loadComputerBoard: () => (/* binding */ loadComputerBoard),\n/* harmony export */   person: () => (/* binding */ person),\n/* harmony export */   play: () => (/* binding */ play)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\n\n\n\n\n// Creating the players\nconst person = (0,_player_js__WEBPACK_IMPORTED_MODULE_2__.playerFactory)();\nconst computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_2__.playerFactory)();\n\nlet first_attack = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(5,5); //TODO DEV USE ONLY\n\n// Loads the computer ships onto board\nfunction loadComputerBoard(){\n    let placePosn;\n    for (let i=0; i<_constants_js__WEBPACK_IMPORTED_MODULE_0__.shipSizes.length; i++){\n        while (!placePosn || !computer.board.placeShip(placePosn,placePosn.x%2,_constants_js__WEBPACK_IMPORTED_MODULE_0__.shipSizes[i],false)) { \n            placePosn = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)( Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y+1)));\n        } \n    }\n}\n\n// Plays a round; attacks computer then gets attacked by computer\n// Returns winning player or null\nfunction play(personTarget){\n    let computerTarget;\n\n    \n    \n    if (!person.verifyUnique(personTarget))  return; // TODO: Move to DOM? update this using shots[] in player instead\n        \n        \n    \n        \n    // Process person's attack\n    person.shots.push(personTarget);\n    if (processAttack(computer, personTarget)) return person;\n\n\n    \n        \n    // TODO: Clean up here after checking player.js\n    // Define computerTarget; either random or based off of AI logic\n    if (computer.nextMove) computerTarget = computer.nextMove; // Check if nextMove is defined (AI logic in player module)\n    \n    if (!computerTarget) { // Generate a random valid target for computer to shoot\n        while (!computerTarget || !computer.verifyUnique(computerTarget)){\n            computerTarget = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)( Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y+1)));\n        }\n    }\n\n     //DEV USE ONLY\n    if (first_attack){\n        computerTarget = first_attack;\n        first_attack = false;\n    }\n\n    // Process computer's attack\n    computer.shots.push(computerTarget);\n    if (processAttack(person, computerTarget)) return computer;\n}\n\n\n// Returns true if attack results in win, false otherwise\nfunction processAttack(victim, target){\n    // console.log(\"Attack (\", target.x, ',',target.y,')'); // TODO\n    let shipHit = victim.board.receiveAttack(target) //returns the ship if the attack hit, else returns false. Also updates boards hits/missed arrays\n    if (shipHit) {\n        if (shipHit.isSunk()){\n            if (victim === person) {\n                computer.nextMove = null; //TODO: This causes issues?\n                computer.resetnextMove();\n            }\n        } else if (victim === person){ \n            computer.updateNextMove(target, true); // Update AI intelligence\n        }\n        return victim.board.allSunk(); // Check for win\n    }else{\n        // Update AI intelligence ONLY if nextMove was defined\n        if (victim === person && computer.nextMove) computer.updateNextMove(target, false)\n    }\n    return false; // Miss cannot result in game win\n}\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameboardFactory: () => (/* binding */ gameboardFactory)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n\n\n\n\n\n\nconst gameboardFactory = () => {\n    let ships = [];         // Tracks ship objects placed on the board. Ie. ships[0] = [ship obj, array of posns occupied by ship object]\n    let hits = [];          // Array of hit shot posn's\n    let missed = [];        // Array of missed shot posn's\n\n    // Given a posn and direction, attempts to place a ship of specified size. Returns true and places ship if placement is valid, false otherwise\n    // Ie. placeShip((0,0), true, 5, false) would be a ship with head at origin and spanning to right 5 blocks\n    // If queryONLY, ship won't be placed\n    function placeShip(posn, horizontal, size, queryONLY){\n        if (posn.x < 0 || posn.y < 0 || posn.x > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X || posn.y > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y) return false;\n\n        // Check that ship placement would not spill outside gameboard\n        if (horizontal && posn.x + size > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X+1) return false; //horizontal going right\n        if (!horizontal && posn.y - size < -1) return false; // vertical going down\n            \n        // Checking that ship we want to place does not overlap with other ships\n        const spacesOccupied = getSpacesOccupiedByShip(posn, horizontal, size); // Spaces our candidate ship would occupy\n        // Check that none of these spaces occupied coincide with any of spaces occupied by current ships\n        for (let i=0; i<ships.length; i++){ // Go thru each ship\n            for (let j=0; j<ships[i][1].length; j++){ // Go thru each ships occupied spaces array\n                for (let k=0; k<spacesOccupied.length; k++){ // For each of the ships coordinates, we check against each coordinate in the proposed ship\n                    if (spacesOccupied[k].x === ships[i][1][j].x && spacesOccupied[k].y === ships[i][1][j].y ) return false;\n                }\n            }\n        }\n\n        // Creating and placing the ship\n        if (!queryONLY) ships.push( [(0,_ship_js__WEBPACK_IMPORTED_MODULE_1__.shipFactory)(size), spacesOccupied] ); \n        return true;\n    }\n\n    //determines whether attack hit a ship, then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot for the gameboard\n    //return the ship if the attack hit, else returns false\n    function receiveAttack(target){\n        for (let i=0; i<ships.length; i++){ // Checking each ship\n            for (let j=0; j<ships[i][1].length; j++){ // Checking each position of each ship\n                if (ships[i][1][j].x === target.x && ships[i][1][j].y === target.y){ //HIT\n                    ships[i][0].hit();\n                    hits.push(target);\n                    return ships[i][0];\n                }\n            }\n        }\n        missed.push(target)\n        return false;\n    }\n\n    // Returns true if all ships on board are sunk\n    function allSunk(){\n        for (let i=0; i<ships.length; i++){\n            if (ships[i][0].isSunk() === false) return false;\n        }\n        return true;\n    }\n\n    // Returns an array of posn's corresponding to posns which would be occupied by the specified ship\n    // Used internally by placeShip\n    function getSpacesOccupiedByShip(head, horizontal, size){\n        let result = [head]\n        if (horizontal){ //horizontal going right\n            for (let i=1; i<size; i++){\n                result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(head.x+i,head.y))\n            }\n        }else{ // vertical going down\n            for (let i=1; i<size; i++){\n                result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(head.x,head.y-i))\n            }\n        }\n        return result;\n    }\n\n    return{\n        placeShip, receiveAttack, allSunk,  ships, missed, hits \n    }\n}\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page.js */ \"./src/page.js\");\n\n\n(0,_page_js__WEBPACK_IMPORTED_MODULE_0__.loadSite)();\n\n//# sourceURL=webpack://battleship/./src/main.js?");

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadSite: () => (/* binding */ loadSite)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n \n\n\n\n\n\nlet shipSizesIDX = 0;       // Tracks which ship we are currently working on\nlet horizontal = true;      // Used for ship placement\nlet gameStarted = false;    // True when player has placed all their ships\nlet gameOver = false;       // True when a winner has been decided\nlet winner=null;            // { null, person, computer }\n\n// Loads components; called by main.js\nfunction loadSite(){\n    const content = document.querySelector('#content');\n\n    // HEADER\n    content.appendChild(createHeader());\n\n    // GRID LABELS\n    content.appendChild(createLabel('Enemy'));\n    content.appendChild(createLabel('Your Fleet'));\n\n    // GRIDS\n    content.appendChild(createComputerGrid());\n    content.appendChild(createPersonGrid());\n\n    // FOOTER\n    content.appendChild(createFooter());\n\n    // Placing computer ships\n    (0,_game__WEBPACK_IMPORTED_MODULE_2__.loadComputerBoard)(); \n    drawShips('computerGrid'); //TODO: REMOVE\n}\n\n// Returns div corresponding to header\nfunction createHeader(){\n    const header = document.createElement('div');\n    header.classList.add('header');\n    header.textContent = \"BATTLESHIP\";\n    return header;\n}\n\n// Return div corresponding to grid label\nfunction createLabel(text){\n    const label = document.createElement('div');\n    label.classList.add('label');\n    label.textContent = text;\n    return label;\n}\n\n// Returns div corresponding to a grid\nfunction createGrid(){\n    const grid = document.createElement('div');\n    grid.classList.add('grid')\n\n    // Create cells\n    for (let i=0; i<(_constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X+1)*(_constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y+1); i++){\n        const cell = document.createElement('div');\n        cell.classList.add('cell');\n        grid.appendChild(cell);\n    }\n    return grid;\n}\n\n// Returns div corresponding to computerGrid\nfunction createComputerGrid(){\n    const grid = createGrid();\n    grid.id = 'computerGrid';\n    \n    // computerGrid Listeners \n    for (let childIDX=0; childIDX<grid.children.length; childIDX++){\n        grid.children[childIDX].addEventListener('click', (e) => {\n            e.preventDefault();\n            if (gameStarted && !gameOver){\n                winner = (0,_game__WEBPACK_IMPORTED_MODULE_2__.play)((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(childIDX%10, 9 - parseInt(childIDX/10))); // Returns winner or null\n                updateBoards();\n                if (winner === _game__WEBPACK_IMPORTED_MODULE_2__.person){\n                    gameOver = true;\n                    updateFooter()\n                } else if (winner === _game__WEBPACK_IMPORTED_MODULE_2__.computer){\n                    gameOver = true;\n                    updateFooter()\n                    drawShips('computerGrid');\n                }\n            }\n        });\n        grid.children[childIDX].addEventListener('mouseenter', (e) => {\n            if (gameStarted && !gameOver) grid.children[childIDX].classList.add('hover')\n        });\n        grid.children[childIDX].addEventListener('mouseleave', (e) => {\n            if (gameStarted && !gameOver) grid.children[childIDX].classList.remove('hover')\n        });\n    }\n    return grid;\n}\n\n// Returns div corresponding to personGrid\nfunction createPersonGrid(){\n    // GRIDS -- PERSON\n    const grid = createGrid();\n    grid.id = 'personGrid';\n    \n    // personGrid Listeners \n    for (let childIDX=0; childIDX<grid.children.length; childIDX++){\n        grid.children[childIDX].addEventListener('click', (e) => {\n            e.preventDefault();\n            // If gameStarted, try to placeShip at current location\n            if (!gameStarted && _game__WEBPACK_IMPORTED_MODULE_2__.person.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(childIDX%10,9 - parseInt(childIDX/10)), horizontal, _constants_js__WEBPACK_IMPORTED_MODULE_0__.shipSizes[shipSizesIDX], false)){\n                // Placed ship successfully \n                updateConsideredShip(childIDX, false) //wipe out the preview for that ship\n                drawShips('personGrid');\n                shipSizesIDX++; // Advancing to next ship to place\n                if (shipSizesIDX >= _constants_js__WEBPACK_IMPORTED_MODULE_0__.shipSizes.length){\n                    // All ships now placed\n                    gameStarted=true;\n                    updateFooter();\n                }\n            }\n        });\n        grid.children[childIDX].addEventListener('contextmenu', (e) => {\n            e.preventDefault();\n            updateConsideredShip(childIDX,false); // Remove current preview\n            horizontal = !horizontal;\n            updateConsideredShip(childIDX,true);  // Draw new preview\n        });\n        \n        grid.children[childIDX].addEventListener('mouseenter', (e) => {\n            if (!gameStarted) updateConsideredShip(childIDX, true); \n        });\n\n        grid.children[childIDX].addEventListener('mouseleave', (e) => {\n            if (!gameStarted) updateConsideredShip(childIDX, false);\n        });\n    }\n    return grid;\n}\n\n// Returns div corresponding to footer\nfunction createFooter(){\n    const footer = document.createElement('div');\n    footer.classList.add('footer');\n    footer.id = 'footer';\n    footer.textContent = \"Place your ships (right click to rotate)\";\n    return footer;\n}\n\n// Updates footer with relevant info\n// Footer has 3 possible states: setup, ingame, endgame\n// Setup is default/preloaded state\nfunction updateFooter(){\n    const footer = document.getElementById('footer')\n    if (!gameOver){\n        // show encouraging text\n        footer.textContent = 'Fortune favours the bold...'\n         \n    } else {\n        // Show winner and restart button\n        winner === _game__WEBPACK_IMPORTED_MODULE_2__.person? footer.textContent = 'Congratulations admiral, we have won!' : footer.textContent = 'We may have lost the battle, but the war rages on'\n        const restartBtn = document.createElement('button');\n        restartBtn.textContent = \"Next battle\";\n        restartBtn.addEventListener('click', (e) => {\n            location.reload();\n        });\n        footer.appendChild(restartBtn);\n    }\n}\n\n// Updates grid to draw/wipe considered ships on hover\nfunction updateConsideredShip(IDX, draw){\n    const cells = document.getElementById('personGrid').children;\n    let cellIDX; // Tracks cell we are modifying\n    for (let i=0; i<_constants_js__WEBPACK_IMPORTED_MODULE_0__.shipSizes[shipSizesIDX]; i++){ // Drawing each cell of the ship we are currently placing\n        horizontal? cellIDX = IDX + i: cellIDX = IDX + i*10 \n        if ((horizontal && parseInt(IDX/10) !== parseInt(cellIDX/10)) || cellIDX>99) continue; // Spill over detection\n        if (draw && _game__WEBPACK_IMPORTED_MODULE_2__.person.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(IDX%10, 9 - parseInt(IDX/10)),horizontal,_constants_js__WEBPACK_IMPORTED_MODULE_0__.shipSizes[shipSizesIDX],true)){\n            // DRAW VALID PLACEMENT\n            cells[cellIDX].classList.remove('hover_consider_invalid')\n            cells[cellIDX].classList.add('hover_consider_valid')\n        }else if (draw) {\n            // DRAW INVALID PLACEMENT\n            cells[cellIDX].classList.remove('hover_consider_valid')\n            cells[cellIDX].classList.add('hover_consider_invalid')\n        } else{\n            // ERASE\n            cells[cellIDX].classList.remove('hover_consider_invalid')\n            cells[cellIDX].classList.remove('hover_consider_valid')\n        }\n    }        \n}\n\n// Updates both gameboards to reflect hits/misses/sunken ship\nfunction updateBoards(){\n    const computerCells = document.getElementById('computerGrid').childNodes;\n    const personCells = document.getElementById('personGrid').childNodes; \n\n    // Build sunkenShips array based off of ships array\n    let computerSunkenShips = getSunkenPosns(_game__WEBPACK_IMPORTED_MODULE_2__.computer.board.ships)\n    let personSunkenShips = getSunkenPosns(_game__WEBPACK_IMPORTED_MODULE_2__.person.board.ships)\n\n    // Update computer grid to show misses, hits and sink\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_2__.computer.board.missed.length; i++){ // go thru missed array (array of posns)\n        computerCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_2__.computer.board.missed[i].y) + _game__WEBPACK_IMPORTED_MODULE_2__.computer.board.missed[i].x)].classList.add('miss');\n    }\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_2__.computer.board.hits.length; i++){ // go thru hits array (array of posns)\n        computerCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_2__.computer.board.hits[i].y) + _game__WEBPACK_IMPORTED_MODULE_2__.computer.board.hits[i].x)].classList.add('hit');\n    }\n    for (let i=0; i<computerSunkenShips.length; i++){ // go thru sunkenShips array (array of posns)\n        computerCells[(10*(9 - computerSunkenShips[i].y) + computerSunkenShips[i].x)].classList.add('sunk');\n    }\n\n    // Update person grid to show misses, hits and sink\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_2__.person.board.missed.length; i++){ // go thru missed array (array of posns)\n        personCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_2__.person.board.missed[i].y) + _game__WEBPACK_IMPORTED_MODULE_2__.person.board.missed[i].x)].classList.add('miss');\n    }\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_2__.person.board.hits.length; i++){ // go thru missed array (array of posns)\n        personCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_2__.person.board.hits[i].y) + _game__WEBPACK_IMPORTED_MODULE_2__.person.board.hits[i].x)].classList.add('hit');\n    } \n    for (let i=0; i<personSunkenShips.length; i++){ // go thru sunkenShips array (array of posns)\n        personCells[(10*(9 - personSunkenShips[i].y) + personSunkenShips[i].x)].classList.add('sunk');\n    } \n}\n\n// Draws the ships on given grid\nfunction drawShips(grid){\n    const cells = document.getElementById(grid).childNodes; \n    let spacesOccupied;// array of posns occupied by ships on provided grid\n\n    grid == 'personGrid'? spacesOccupied = getOccupiedSpaces(_game__WEBPACK_IMPORTED_MODULE_2__.person.board) :  spacesOccupied = getOccupiedSpaces(_game__WEBPACK_IMPORTED_MODULE_2__.computer.board)\n    for (let i=0; i<spacesOccupied.length; i++){\n        cells[(10*(_constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');\n    }\n}\n\n// Given an array of ships, returns an array of posns which have a sunken ship on them\nfunction getSunkenPosns(ships){\n    let result = [];\n    for (let i=0; i<ships.length; i++){\n        if (ships[i][0].isSunk()){\n            for (let k=0; k<ships[i][1].length; k++){\n                result.push(ships[i][1][k])\n            }\n        }\n    }\n    return result;\n}\n\n// Given a board, returns an array of posns corresponding to spaces occupied by all ships\nfunction getOccupiedSpaces(board){\n    let result = [];\n    for (let i=0; i<board.ships.length; i++){ // Go thru all ships on board\n        for (let j=0; j<board.ships[i][1].length; j++){ // For each ship, go thru all posns \n            result.push(board.ships[i][1][j]);\n        }\n    }\n    return result;\n}\n\n//# sourceURL=webpack://battleship/./src/page.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   playerFactory: () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n\n\n\n\n\n\nconst playerFactory = () => {\n    let board = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_2__.gameboardFactory)();             // Board associated with the player\n    let shots = []                              // Array of posns tracking shots taken by a player\n\n    let nextMove = null;                        // Used by AI: represents next posn to shoot at\n    let lastHit = false;                        // Used by AI: tracks last known hit by AI\n    let firstHit = false;                       // Used by AI: tracks the posn of where we first struck the ship\n    const nextDirArr = ['R', 'L', 'U', 'D'];    // Used by AI: \n    let nextDirArrIDX = 0;                      // Used by AI:\n    let direction = 'R';                        // Used by AI:\n\n    // Verify that target has not been shot at before\n    function verifyUnique(target){\n        for (let i=0; i<shots.length; i++){ \n            if (shots[i].x === target.x && shots[i].y === target.y) return false;\n        }\n        return true;\n    }\n\n    // Increments IDX by 1 featuring wrap around (TODO: Simply with modulo?)\n    function advancenextDirArrIDX(){\n        if (nextDirArrIDX === 3){\n            nextDirArrIDX = 0;\n        }else{\n            nextDirArrIDX++;\n        }\n    }\n\n    // Flips direction to opposite\n    function flipDir(){\n        switch (direction){\n            case 'R':\n                direction = 'L';\n            break;\n            case 'L':\n                direction = 'R';\n            break;\n            case 'U':\n                direction = 'D';\n            break;\n            case 'D':\n                direction = 'U';\n            break;\n        }\n    }\n\n    // Returns posn coresponding to moving in direction from origin. Not guaranteed legal\n    function generateNewMove(origin){\n        switch (direction){\n            case 'R':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(origin.x+1, origin.y);\n            case 'L':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(origin.x-1, origin.y);\n            case 'U':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(origin.x, origin.y+1);\n            case 'D':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(origin.x, origin.y-1);\n        }\n    }\n\n\n    // Updates nextMove\n    // current represents where the attack took place\n    // Called when ship is HIT OR we found a ship but missed BEFORE we sunk it\n    function updateNextMove(current, isHit){\n        let dirLimit = 3; // Limiting the amount of options we should evaluate before giving up and taking first hit as origin (Ie. chase other way)\n\n        // Figuring out what direction to take and where we should move from (lastHit)\n        if (isHit){\n            if (!firstHit) firstHit = current; //define first hit if it truly is the first one\n            // Dont change direction\n            lastHit = current;\n        } else{ //MISS\n            if (firstHit != lastHit){ //we missed after we had 2 hits on the ship; so go the other way\n                lastHit = firstHit; \n                flipDir();\n            } else { // Our one and only previous hit is the end piece of the ship. Try different dir.\n                advancenextDirArrIDX();\n                direction = nextDirArr[nextDirArrIDX];\n            }\n        }\n        \n        let candidate = generateNewMove(lastHit);\n\n        // Verify is on board\n        while (candidate.x > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X || candidate.x < 0 || candidate.y > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y || candidate.y < 0){\n            advancenextDirArrIDX();\n            direction = nextDirArr[nextDirArrIDX];\n            candidate = generateNewMove(lastHit);\n        }\n     \n        // Verify not somewhere we have shot before\n        while (!verifyUnique(candidate)){ \n            dirLimit--;\n            \n            // Prevent infinite loop(edge case)\n            // Update lastHit to actually be first hit\n            if (dirLimit < 0) {\n                lastHit = firstHit;\n                dirLimit = 3;\n            } \n            advancenextDirArrIDX();\n            direction = nextDirArr[nextDirArrIDX];\n            candidate = generateNewMove(lastHit);\n        }\n        // We are confident candidate is on board and unique, so it will be the next move\n        nextMove = candidate; //TODO: Why we need this?\n    }\n\n    // Resets AI params. NOTE: Called as a method Ie. myPlayerObj.resetnextMove(). So we must use \"this\"\n    function resetnextMove(){\n        // nextMove = null;\n        lastHit = false; \n        firstHit = false;\n        nextDirArrIDX = 0;\n        direction = 'R';\n    }\n   \n    return {\n        verifyUnique, updateNextMove, resetnextMove, board, nextMove, shots\n    }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;