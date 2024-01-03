const player = require('./player.js')
const ship = require('./ship.js')
const gameboard = require('./gameboard.js')

const posnFactory = (x, y) => {
    return{
        get x(){return x;}, set x(newX){x=newX},
        get y(){return y;}, set y(newY){y=newY}
    }
}

// Creating the gameboards and players
const person = player.playerFactory();
const computer = player.playerFactory();

const personGB = gameboard.gameboardFactory();
const computerGB = gameboard.gameboardFactory();

// // Placing a computer ship at the origin
const origin = posnFactory(0,0);
computerGB.placeShip(origin,'R',5);


module.exports = { posnFactory }


