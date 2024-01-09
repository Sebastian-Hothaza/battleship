import { playerFactory } from './player.js';
import { posnFactory } from './posn.js';
import { loadSite, drawPersonShip, updateBoards, markCell } from './page.js';

export { person, computer, play }

// Creating the players
const person = playerFactory();
const computer = playerFactory();
loadSite();
loadBoards();

// Loads the ships onto the boards 
function loadBoards(){
    // Placing the computer ships
    computer.board.placeShip(posnFactory(0,0),'R',5);
    // placeComputerShips(sizes) // Randomly places computer ships. Sizes is array of ship sizes

    // Placing the player ships
    person.board.placeShip(posnFactory(1,1), 'R', 8);

    person.board.placeShip(posnFactory(1,3), 'R', 8);

    person.board.placeShip(posnFactory(1,5), 'R', 8);
    

    drawPersonShip(); // Draws the persons ships
}

// Called by click-listener when person clicks hostile cell
// Verifies move is valid and calls processAttack
function play(move){
    // Verify making a move is permitted
    // TODO: Game allows a move even after game over event or before ships are setup
    if (0) return;
    
    // Verify target hasn't been shot at before
    // TODO: Game allows clicking any spot
    if (0) return;
    
    

    // Process the plays
    processAttack(computer.board, posnFactory(move%10, 9 - parseInt(move/10)));

    // TODO: Add wait timer?
    processAttack(person.board, computer.getRandomTarget(person.board)); //TODO: Add AI inteligence

    


    // Check if someone won
    // TODO: Game is in infinite loop

}

// Processes an attack and updates the DOM. Must be a legal move.
// Called by play
function processAttack(GB, target){
    // console.log("Attack (", target.x, ',',target.y,')');
        let shipHit = GB.receiveAttack(target)
        
        if (shipHit) {
            // console.log("BOOM");
            markCell(GB,'hit', (((9-target.y)*10) + target.x));
            if (shipHit.isSunk()){
                console.log("ship sunk")               
            }
        } else {
            // console.log("SPLASH");
            markCell(GB,'miss', (((9-target.y)*10) + target.x));

        }
        //updateBoards(); // DOM
}