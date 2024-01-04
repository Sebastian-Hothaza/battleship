const player = require('./player.js')
const ship = require('./ship.js')
const gameboard = require('./gameboard.js')
const posn = require('./posn.js')


// Creating the gameboards and players
const person = player.playerFactory();
const computer = player.playerFactory();

const personGB = gameboard.gameboardFactory();
const computerGB = gameboard.gameboardFactory();

// // Placing a computer ship at the origin
const origin = posn.posnFactory(0,0);
computerGB.placeShip(origin,'R',5);




