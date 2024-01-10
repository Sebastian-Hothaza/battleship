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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   computer: () => (/* binding */ computer),\n/* harmony export */   loadBoards: () => (/* binding */ loadBoards),\n/* harmony export */   person: () => (/* binding */ person),\n/* harmony export */   play: () => (/* binding */ play)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\n\n\n\n\n\n\n\n// Creating the players\nconst person = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)();\nconst computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerFactory)();\nlet gameOver = false;\nlet first_attack = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(9,5); // DEV USE ONLY\n\n\n\n// Loads the ships onto the boards\nfunction loadBoards(){\n    // Placing the computer ships\n    for (let i=0; i<_constants_js__WEBPACK_IMPORTED_MODULE_2__.shipSizes.length; i++){\n        let placePosn;\n        let dir;\n        do { \n            placePosn = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)( Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_2__.GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_2__.GAMEBOARD_MAX_Y+1)));\n            placePosn.x%2? dir='R' : dir='U'\n        } while (!computer.board.placeShip(placePosn,dir,_constants_js__WEBPACK_IMPORTED_MODULE_2__.shipSizes[i]))\n    }\n\n    // Placing the player ships\n    person.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(1,1), 'R', 5);\n    person.board.placeShip((0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(9,3), 'U', 3);\n}\n\n// Called by click-listener when person clicks hostile cell\n// Verifies move is valid and calls processAttack\nfunction play(move){\n    if (gameOver) return; \n\n    move = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)(move%10, 9 - parseInt(move/10)); // Convert to posn. Currently only supports 10x10 grids\n    let computerTarget;\n        \n    // Verify target hasn't been shot at before //TODO: update this using shots[] in player instead\n    if (!person.verifyUnique(move, computer.board)) {\n        // TODO: Update footer to advise user \n        return;\n    }\n\n    // Process the plays\n    person.shots.push(move);\n    if (processAttack(computer, move)){\n        console.log(\"PERSON WINS\");\n        gameOver = true;\n        return;\n    }\n    \n\n\n      //DEV USE ONLY\n      if (first_attack){\n        computerTarget = first_attack;\n        first_attack = false;\n    }\n\n\n\n\n    if (computer.nextMove){\n        computerTarget = computer.nextMove;\n    }else{\n        // Generate a valid target for computer to shoot\n        while (!computerTarget || !computer.verifyUnique(computerTarget, person.board)){\n            computerTarget = (0,_posn_js__WEBPACK_IMPORTED_MODULE_1__.posnFactory)( Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_2__.GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (_constants_js__WEBPACK_IMPORTED_MODULE_2__.GAMEBOARD_MAX_Y+1)));\n        }\n    }\n    \n    computer.shots.push(computerTarget);\n    if (processAttack(person, computerTarget)){ \n        console.log(\"COMPUTER WINS\");\n        gameOver = true;\n        return;\n    }\n}\n\n// Processes an attack and updates the DOM. Must be a legal move.\n// Returns true if attack results in win, false otherwise\n// Called by play\nfunction processAttack(victim, target){\n    // console.log(\"Attack (\", target.x, ',',target.y,')');\n    let shipHit = victim.board.receiveAttack(target)\n    if (shipHit) {\n        // markCell(victim.board,'hit', (((GAMEBOARD_MAX_Y-target.y)*10) + target.x));\n        // console.log('BOOM')\n        // Update AI intelligence\n        if (shipHit.isSunk()){\n            console.log(\"ship sunk\")\n            if (victim === person){\n                computer.nextMove = false;\n                computer.resetnextMove();\n            }\n                            \n        } else if (victim === person){\n            computer.updateNextMove(target, shipHit);\n        }\n        // updateBoards();\n        return victim.board.allSunk(); // Check for win\n    } else{\n        // console.log('SPLASH')\n        // Update AI intelligence ONLY if nextMove was defined\n        if (victim === person && computer.nextMove){\n            computer.updateNextMove(target, shipHit)\n            // console.log(\"Updated nextMove to: \", computer.nextMove)\n        }\n\n        // markCell(victim.board,'miss', (((GAMEBOARD_MAX_Y-target.y)*10) + target.x));\n    }\n    // updateBoards();\n    return false;\n}\n\nfunction debugSHOOTAI(target){\n    computer.shots.push(target);\n    processAttack(person, target);\n}\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameboardFactory: () => (/* binding */ gameboardFactory)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n// Gameboards should keep track of missed attacks so they can display them properly.\n// TODO: Can we simply to onyl track horizontal/vertical rather than heading?\n\n\n\n\n\n\n\n\n// ONLY board has concept of where a ship is\nconst gameboardFactory = () => {\n\n    // Gameboard needs to know which ship occupies which spots\n    let ships = []; // Tracks ship objects placed on the board. Ie. ships[0] = [ship obj, array of posns occupied by ship object]\n    let missed = []; // Array of missed shot posn's\n    let hits = []; // Array of hit shot posn's\n\n    // Given a posn and direction, attempts to place a ship of specified size. Returns true and places ship if placement is valid, false otherwise\n    // Dir is given as oneOf(U,D,L,R). Ie. placeShip((0,0), R, 5) would be a ship with head at origin and spanning to right 5 blocks\n    function placeShip(posn, dir, size){\n        // Check that the posn is valid\n        if (posn.x < 0 || posn.y < 0 || posn.x > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X || posn.y > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y) return false;\n\n        // Check that ship placement would not spill outside gameboard\n        switch (dir){\n            case 'L':\n                if (posn.x - size < 0) return false;\n                break;\n            case 'R':\n                if (posn.x + size > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_X) return false;\n                break;\n            case 'U':\n                if (posn.y + size > _constants_js__WEBPACK_IMPORTED_MODULE_0__.GAMEBOARD_MAX_Y) return false;\n                break;\n            case 'D':\n                if (posn.y - size < 0) return false;\n                break;\n            default:\n                return false;\n        }\n\n        // Checking that ship playerplacement does not overlap with other ships\n        const spacesOccupied = getSpacesOccupiedByShip(posn, dir, size);\n\n        // Check that none of these spaces occupied coincide with any of spaces occupied by current ships\n        for (let i=0; i<ships.length; i++){ // Go thru each ship\n            for (let j=0; j<ships[i][1].length; j++){ // Go thru each ships occupied spaces array\n                for (let k=0; k<spacesOccupied.length; k++){ // For each of the ships coordinates, we check against each coordinate in the proposed ship\n                    if (spacesOccupied[k].x === ships[i][1][j].x && spacesOccupied[k].y === ships[i][1][j].y ) return false;\n                }\n            }\n        }\n\n        // Creating and placing the ship\n        ships.push( [(0,_ship_js__WEBPACK_IMPORTED_MODULE_1__.shipFactory)(size), spacesOccupied] ); \n       \n        return true;\n    }\n\n    //determines whether attack hit a ship, then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot for the gameboard\n    //return the ship if the attack hit, else returns false\n    function receiveAttack(target){\n        for (let i=0; i<ships.length; i++){\n            for (let j=0; j<ships[i][1].length; j++){\n                if (ships[i][1][j].x === target.x && ships[i][1][j].y === target.y){\n                    ships[i][0].hit();\n                    hits.push(target);\n                    return ships[i][0];\n                }\n            }\n        }\n        missed.push(target)\n        return false;\n    }\n\n    // Returns true if all ships on board are sunk\n    function allSunk(){\n        for (let i=0; i<ships.length; i++){\n            if (ships[i][0].isSunk() === false) return false;\n        }\n        return true;\n    }\n\n    // Returns an array of posns corresponding to spaces occupied by ships\n    // Called in page.js by drawPersonShip\n    function getOccupiedSpaces(){\n        let result = [];\n        for (let i=0; i<ships.length; i++){\n            for (let j=0; j<ships[i][1].length; j++){\n                result.push(ships[i][1][j]);\n            }\n        }\n        return result;\n    }\n\n    // Returns an array of posn's corresponding to posns which would be occupied by the specified ship\n    // Used internally by placeShip\n    function getSpacesOccupiedByShip(head, dir, size){\n        let result = [head]\n\n        switch(dir){\n            case 'L':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(head.x-i,head.y))\n                }\n                break;\n            case 'R':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(head.x+i,head.y))\n                }\n                break;\n            case 'U':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(head.x,head.y+i))\n                }\n                break;\n            case 'D':\n                for (let i=1; i<size; i++){\n                    result.push((0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(head.x,head.y-i))\n                }\n                break;\n            default:\n                //TODO, throw error?\n            \n        }\n        return result;\n    }\n\n    return{\n        placeShip, receiveAttack, allSunk, getOccupiedSpaces, missed, hits\n    }\n}\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadSite: () => (/* binding */ loadSite)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\n\n\n\n\n\nfunction loadSite(){\n    const content = document.querySelector('#content');\n\n    content.appendChild(createHeader());\n\n    const opponentLabel = document.createElement('div');\n    opponentLabel.classList.add('label');\n    opponentLabel.textContent = \"OPPONENT\";\n    content.appendChild(opponentLabel);\n\n    const youLabel = document.createElement('div');\n    youLabel.classList.add('label');\n    youLabel.textContent = \"YOU\";\n    content.appendChild(youLabel);\n\n    const computerGrid = createGrid();\n    computerGrid.id = 'computerGrid';\n    content.appendChild(computerGrid);\n    // Attach listeners to computer grid\n    let cells = computerGrid.children;\n    for (let childIDX=0; childIDX<cells.length; childIDX++){\n        cells[childIDX].addEventListener('mousedown', (e) => {\n            e.preventDefault();\n            (0,_game__WEBPACK_IMPORTED_MODULE_0__.play)(childIDX); \n            updateBoards(); \n            //TODO: game should export a var (Ie. game status) so the DOM can import it and use to update header.\n        });\n    }\n    \n   \n\n    const personGrid = createGrid();\n    personGrid.id = 'personGrid';\n    content.appendChild(personGrid);\n\n    content.appendChild(createFooter());\n\n    (0,_game__WEBPACK_IMPORTED_MODULE_0__.loadBoards)();  \n    drawPersonShip();\n    drawComputerShip();\n\n}\n\n// Returns div corresponding to header\nfunction createHeader(){\n    const header = document.createElement('div');\n    header.classList.add('header');\n    header.textContent = \"BATTLESHIP\";\n    return header;\n}\n\n// Returns div corresponding to footer\nfunction createFooter(){\n    const footer = document.createElement('div');\n    footer.classList.add('footer');\n    footer.textContent = \"footer\";\n    return footer;\n}\n\n// Returns div corresponding to a grid\nfunction createGrid(){\n    const grid = document.createElement('div');\n    grid.classList.add('grid')\n\n    // Create cells\n    for (let i=0; i< (_constants_js__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_MAX_X+1)*(_constants_js__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_MAX_Y+1); i++){\n        const cell = document.createElement('div');\n        cell.classList.add('cell');\n        grid.appendChild(cell);\n    }\n    return grid;\n}\n\n// Updates both gameboards to reflect hits/misses\nfunction updateBoards(){\n    const computerCells = document.getElementById('computerGrid').childNodes; // 0 to 99\n    const personCells = document.getElementById('personGrid').childNodes; \n\n    // Update computer grid to show misses and hits\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_0__.computer.board.missed.length; i++){ // go thru missed array (array of posns)\n        computerCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_0__.computer.board.missed[i].y) + _game__WEBPACK_IMPORTED_MODULE_0__.computer.board.missed[i].x)].classList.add('miss');\n    }\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_0__.computer.board.hits.length; i++){ // go thru hits array (array of posns)\n        computerCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_0__.computer.board.hits[i].y) + _game__WEBPACK_IMPORTED_MODULE_0__.computer.board.hits[i].x)].classList.add('hit');\n    }\n    \n    // Update person grid to show misses and hits\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_0__.person.board.missed.length; i++){ // go thru missed array (array of posns)\n        personCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_0__.person.board.missed[i].y) + _game__WEBPACK_IMPORTED_MODULE_0__.person.board.missed[i].x)].classList.add('miss');\n    }\n    for (let i=0; i<_game__WEBPACK_IMPORTED_MODULE_0__.person.board.hits.length; i++){ // go thru missed array (array of posns)\n        personCells[(10*(9 - _game__WEBPACK_IMPORTED_MODULE_0__.person.board.hits[i].y) + _game__WEBPACK_IMPORTED_MODULE_0__.person.board.hits[i].x)].classList.add('hit');\n    } \n}\n\n\n// Marks miss at a given idx for a given GameBoard\nfunction markCell(GB, type, idx){\n    let cells;\n    if (GB === _game__WEBPACK_IMPORTED_MODULE_0__.person.board){\n        cells = document.getElementById('personGrid').childNodes;\n    } else {\n        cells = document.getElementById('computerGrid').childNodes;\n    }\n    \n    cells[idx].classList.add(type);\n}\n\n\n\nfunction drawPersonShip(){\n    const cells = document.getElementById('personGrid').childNodes; \n    // ships is array which keeps track of all ship objects on the board. For each ship we call ships[i][1] which returns array of spaces occupied by that ship\n    const spacesOccupied = _game__WEBPACK_IMPORTED_MODULE_0__.person.board.getOccupiedSpaces(); // array of posns\n    for (let i=0; i<spacesOccupied.length; i++){\n        cells[(10*(_constants_js__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_MAX_Y - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');\n    }\n}\n\n// DEV USE ONLY\nfunction drawComputerShip(){\n    const cells = document.getElementById('computerGrid').childNodes; \n    // ships is array which keeps track of all ship objects on the board. For each ship we call ships[i][1] which returns array of spaces occupied by that ship\n    const spacesOccupied = _game__WEBPACK_IMPORTED_MODULE_0__.computer.board.getOccupiedSpaces(); // array of posns\n    for (let i=0; i<spacesOccupied.length; i++){\n        cells[(10*(_constants_js__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_MAX_Y - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/page.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   playerFactory: () => (/* binding */ playerFactory)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _posn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./posn.js */ \"./src/posn.js\");\n// TODO: Figure out why \"this\" is needed!\n\n\n\n\n\nconst playerFactory = () => {\n    let board = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)(); // Board associated with the player\n    let shots = [] // Array of posns tracking shots taken by player\n\n    let nextMove = false; // Used by AI\n\n    let lastHit = false; // Tracks last known hit by AI\n    let firstHit = false; // Tracks the posn of where we first struck the ship\n    const nextDirArr = ['R', 'L', 'U', 'D']; // Used by AI\n    let nextDirArrIDX = 0; // Used by AI\n    let direction = 'R';\n\n    // Verify that the candidate target is a unique shot within targetGB \n    function verifyUnique(target, targetGB){\n        let allShots = targetGB.missed.concat(targetGB.hits); //array of posns that\n        for (let i=0; i<allShots.length; i++){ \n            if (allShots[i].x === target.x && allShots[i].y === target.y){ \n                return false;\n            } \n        }\n        return true;\n    }\n\n\n    // Increments IDX by 1 featuring wrap around (TODO: Simply with modulo?)\n    function advancenextDirArrIDX(){\n        if (nextDirArrIDX === 3){\n            nextDirArrIDX = 0;\n        }else{\n            nextDirArrIDX++;\n        }\n    }\n\n    // Flips direction to opposite\n    function flipDir(){\n        switch (direction){\n            case 'R':\n                direction = 'L';\n            break;\n            case 'L':\n                direction = 'R';\n            break;\n            case 'U':\n                direction = 'D';\n            break;\n            case 'D':\n                direction = 'U';\n            break;\n        }\n    }\n\n    // Returns posn coresponding to moving in direction from origin\n    function generateNewMove(origin){\n        switch (direction){\n            case 'R':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(origin.x+1, origin.y);\n            case 'L':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(origin.x-1, origin.y);\n            case 'U':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(origin.x, origin.y+1);\n            case 'D':\n                return (0,_posn_js__WEBPACK_IMPORTED_MODULE_2__.posnFactory)(origin.x, origin.y-1);\n        }\n    }\n\n    // given a candidate posn, return true if we have ever shot there before\n    function verifyUniqueNewMove(candidate){\n        for (let i=0; i<shots.length; i++){\n            if (candidate.x === shots[i].x && candidate.y === shots[i].y) return false;\n        }\n        return true;\n    }\n\n    // Updates nextMove\n    // current represents where the attack took place\n    // Called when ship is HIT OR we found a ship but missed BEFORE we sunk it\n    function updateNextMove(current, isHit){\n        let dirLimit = 3; // Limiting the amount of options we should evaluate before giving up and taking first hit as origin (Ie. chase other way)\n\n        // Figuring out what direction to take and where we should move from (lastHit)\n        if (isHit){\n            if (!firstHit) firstHit = current; //define first hit if it truly is the first one\n            // Dont change direction\n            lastHit = current;\n        } else{ //MISS\n            if (firstHit != lastHit){ //we missed after we had 2 hits on the ship; so go the other way\n                lastHit = firstHit; \n                flipDir();\n            } else { // Our one and only previous hit is the end piece of the ship. Try different dir.\n                advancenextDirArrIDX();\n                direction = nextDirArr[nextDirArrIDX];\n            }\n        }\n        \n        let candidate = generateNewMove(lastHit);\n\n        // Verify is on board\n        while (candidate.x > _constants_js__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_MAX_X || candidate.x < 0 || candidate.y > _constants_js__WEBPACK_IMPORTED_MODULE_1__.GAMEBOARD_MAX_Y || candidate.y < 0){\n            advancenextDirArrIDX();\n            direction = nextDirArr[nextDirArrIDX];\n            candidate = generateNewMove(lastHit);\n        }\n     \n        // Verify not somewhere we have shot before\n        while (!verifyUniqueNewMove(candidate)){ \n            dirLimit--;\n            \n            // Prevent infinite loop(edge case)\n            // Update lastHit to actually be first hit\n            if (dirLimit < 0) {\n                lastHit = firstHit;\n                dirLimit = 3;\n            } \n            advancenextDirArrIDX();\n            direction = nextDirArr[nextDirArrIDX];\n            candidate = generateNewMove(lastHit);\n        }\n        // We are confident candidate is on board and unique, so it will be the next move\n        this.nextMove = candidate;\n    }\n\n    function resetnextMove(){\n        lastHit = false; \n        firstHit = false;\n        nextDirArrIDX = 0;\n        direction = 'R';\n    }\n   \n    return {\n        verifyUnique, updateNextMove, resetnextMove, board, nextMove, shots\n    }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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