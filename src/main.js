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




loadBoards();

if (runGame() === person){
    console.log('You win!')
} else {
    console.log('You lose')
}

function loadBoards(){
    // Placing the computer ships
    computerGB.placeShip(posnFactory(0,0),'R',5);

    // Placing the player ships
    personGB.placeShip(posnFactory(1,1), 'R', 5);
}

// Begin game loop (runs until either gameboard reports all ships sunk; in that case other player wins)
// Returns winner
function runGame(){
    console.log("BEGIN GAME LOOP, person goes first")
    let personTurn = true;
    let GB; //Represent the GB the attack occurs on
    let target;



    while (personGB.allSunk() !== true && computerGB.allSunk() !== true){
        // setup
        if (personTurn){
            GB = computerGB;
            //ISSUE: User should not be able to attack same spot. Enforce in DOM
            let xy = prompt("enter xy to attack"); 
            target = posnFactory(parseInt(xy/10), xy%10);
        } else {
            GB = personGB;
            target = computer.getRandomTarget();
        }

        // Processing the move
        console.log("Attack (", target.x, ',',target.y,')');
        let shipHit = GB.receiveAttack(target)
        
        if (shipHit) {
            console.log("BOOM");
            if (shipHit.isSunk()){
                console.log("ship sunk")
                if (GB.allSunk() && personTurn) return person; 
                if (GB.allSunk()) return computer; 
            }
        } else {
            console.log("SPLASH");
        }
        personTurn = !personTurn  // Switch players
    }
}




