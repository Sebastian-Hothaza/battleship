import { playerFactory } from './player.js';
import { posnFactory } from './posn.js';
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y, shipSizes } from './constants.js';

export { loadComputerBoards, play, person, computer }



// Creating the players
const person = playerFactory();
const computer = playerFactory();
let winner = null;


let first_attack = posnFactory(9,5); // DEV USE ONLY



// Loads the ships onto the boards
function loadComputerBoards(){
    // Placing the computer ships
    for (let i=0; i<shipSizes.length; i++){
        let placePosn;
        
        do { 
            placePosn = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
            
        } while (!computer.board.placeShip(placePosn,placePosn.x%2,shipSizes[i],false))
    }
}

// Called by click-listener when person clicks hostile cell
// Verifies move is valid and calls processAttack
// TODO: Return winning player or null?
function play(move){
    // if (winner) return; // DOM shouldn't call play in this case, we leave it to DOM to not make play calls when game is over

    move = posnFactory(move%10, 9 - parseInt(move/10)); // Convert to posn. Currently only supports 10x10 grids
    let computerTarget;
        
    // Verify target hasn't been shot at before //TODO: update this using shots[] in player instead
    // TODO: Move to DOM?
    if (!person.verifyUnique(move, computer.board)) {
        // TODO: Update footer to advise user 
        return;
    }

    // Process the plays
    person.shots.push(move);
    if (processAttack(computer, move)){
        return person;
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
        return computer;
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
            // console.log("ship sunk")
            if (victim === person){
                computer.nextMove = false;
                computer.resetnextMove();
            }
            victim.board.updateSunkenShips(shipHit);
            
                            
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