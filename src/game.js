import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y, shipSizes } from './constants.js';
import { posnFactory } from './posn.js';
import { playerFactory } from './player.js';

export { person, computer, loadComputerBoard, play }

// Creating the players
const person = playerFactory();
const computer = playerFactory();

let first_attack = posnFactory(5,5); //TODO DEV USE ONLY

// Loads the computer ships onto board
function loadComputerBoard(){
    let placePosn;
    for (let i=0; i<shipSizes.length; i++){
        while (!placePosn || !computer.board.placeShip(placePosn,placePosn.x%2,shipSizes[i],false)) { 
            placePosn = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
        } 
    }
}

// Plays a round; attacks computer then gets attacked by computer
// Returns winning player or null
function play(personTarget){
    let computerTarget;

    
    
    if (!person.verifyUnique(personTarget))  return; // TODO: Move to DOM? update this using shots[] in player instead
        
        
    
        
    // Process person's attack
    person.shots.push(personTarget);
    if (processAttack(computer, personTarget)) return person;


    
        
    // TODO: Clean up here after checking player.js
    // Define computerTarget; either random or based off of AI logic
    if (computer.nextMove) computerTarget = computer.nextMove; // Check if nextMove is defined (AI logic in player module)
    
    if (!computerTarget) { // Generate a random valid target for computer to shoot
        while (!computerTarget || !computer.verifyUnique(computerTarget)){
            computerTarget = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)), Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
        }
    }

     //DEV USE ONLY
    if (first_attack){
        computerTarget = first_attack;
        first_attack = false;
    }

    // Process computer's attack
    computer.shots.push(computerTarget);
    if (processAttack(person, computerTarget)) return computer;
}


// Returns true if attack results in win, false otherwise
function processAttack(victim, target){
    // console.log("Attack (", target.x, ',',target.y,')'); // TODO
    let shipHit = victim.board.receiveAttack(target) //returns the ship if the attack hit, else returns false. Also updates boards hits/missed arrays
    if (shipHit) {
        if (shipHit.isSunk()){
            if (victim === person) {
                computer.nextMove = null; //TODO: This causes issues?
                computer.resetnextMove();
            }
        } else if (victim === person){ 
            computer.updateNextMove(target, true); // Update AI intelligence
        }
        return victim.board.allSunk(); // Check for win
    }else{
        // Update AI intelligence ONLY if nextMove was defined
        if (victim === person && computer.nextMove) computer.updateNextMove(target, false)
    }
    return false; // Miss cannot result in game win
}