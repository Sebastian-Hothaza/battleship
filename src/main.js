// const player = require('./player.js')
// const gameboard = require('./gameboard.js')
// const posn = require('./posn.js')
import { playerFactory } from './player.js';
import { gameboardFactory } from './gameboard.js';
import { posnFactory } from './posn.js';

// Creating the gameboards and players
const person = playerFactory();
const computer = playerFactory();

const personGB = gameboardFactory();
const computerGB = gameboardFactory();

// Placing a computer ship at the origin
computerGB.placeShip(posnFactory(0,0),'R',5);




