import { playerFactory } from './player.js';
import { posnFactory } from './posn.js';
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y, shipSizes } from './constants.js';

export { loadBoards, play, person, computer }



// Creating the players
const person = playerFactory();
const computer = playerFactory();
let gameOver = false;
let first_attack = posnFactory(9,5); // DEV USE ONLY



// Loads the ships onto the boards
function loadBoards(){
    // Placing the computer ships
    for (let i=0; i<shipSizes.length; i++){
        let placePosn;
        let dir;
        do { 
            placePosn = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
            placePosn.x%2? dir='R' : dir='U'
        } while (!computer.board.placeShip(placePosn,dir,shipSizes[i]))
    }

    // Placing the player ships
    person.board.placeShip(posnFactory(1,1), 'R', 5);
    person.board.placeShip(posnFactory(9,3), 'U', 3);
}

// Called by click-listener when person clicks hostile cell
// Verifies move is valid and calls processAttack
function play(move){
    if (gameOver) return; 

    move = posnFactory(move%10, 9 - parseInt(move/10)); // Convert to posn. Currently only supports 10x10 grids
    let computerTarget;
        
    // Verify target hasn't been shot at before //TODO: update this using shots[] in player instead
    if (!person.verifyUnique(move, computer.board)) {
        // TODO: Update footer to advise user 
        return;
    }

    // Process the plays
    person.shots.push(move);
    if (processAttack(computer, move)){
        console.log("PERSON WINS");
        gameOver = true;
        return;
    }
    


      //DEV USE ONLY
      if (first_attack){
        computerTarget = first_attack;
        first_attack = false;
    }




    if (computer.nextMove){
        computerTarget = computer.nextMove;
    }else{
        // Generate a valid target for computer to shoot
        while (!computerTarget || !computer.verifyUnique(computerTarget, person.board)){
            computerTarget = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
        }
    }
    
    computer.shots.push(computerTarget);
    if (processAttack(person, computerTarget)){ 
        console.log("COMPUTER WINS");
        gameOver = true;
        return;
    }
}

// Processes an attack and updates the DOM. Must be a legal move.
// Returns true if attack results in win, false otherwise
// Called by play
function processAttack(victim, target){
    // console.log("Attack (", target.x, ',',target.y,')');
    let shipHit = victim.board.receiveAttack(target)
    if (shipHit) {
        // markCell(victim.board,'hit', (((GAMEBOARD_MAX_Y-target.y)*10) + target.x));
        // console.log('BOOM')
        // Update AI intelligence
        if (shipHit.isSunk()){
            console.log("ship sunk")
            if (victim === person){
                computer.nextMove = false;
                computer.resetnextMove();
            }
                            
        } else if (victim === person){
            computer.updateNextMove(target, shipHit);
        }
        // updateBoards();
        return victim.board.allSunk(); // Check for win
    } else{
        // console.log('SPLASH')
        // Update AI intelligence ONLY if nextMove was defined
        if (victim === person && computer.nextMove){
            computer.updateNextMove(target, shipHit)
            // console.log("Updated nextMove to: ", computer.nextMove)
        }

        // markCell(victim.board,'miss', (((GAMEBOARD_MAX_Y-target.y)*10) + target.x));
    }
    // updateBoards();
    return false;
}

function debugSHOOTAI(target){
    computer.shots.push(target);
    processAttack(person, target);
}