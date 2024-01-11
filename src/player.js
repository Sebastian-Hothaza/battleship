import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from './constants.js';
import { posnFactory } from "./posn.js";
import { gameboardFactory } from "./gameboard.js"

export { playerFactory }

const playerFactory = () => {
    let board = gameboardFactory();             // Board associated with the player
    let shots = []                              // Array of posns tracking shots taken by a player

    let nextMove = null;                        // Used by AI: represents next posn to shoot at
    let lastHit = false;                        // Used by AI: tracks last known hit by AI
    let firstHit = false;                       // Used by AI: tracks the posn of where we first struck the ship
    const nextDirArr = ['R', 'L', 'U', 'D'];    // Used by AI: 
    let nextDirArrIDX = 0;                      // Used by AI:
    let direction = 'R';                        // Used by AI:

    // Verify that target has not been shot at before
    function verifyUnique(target){
        for (let i=0; i<shots.length; i++){ 
            if (shots[i].x === target.x && shots[i].y === target.y) return false;
        }
        return true;
    }

    // Increments IDX by 1 featuring wrap around (TODO: Simply with modulo?)
    function advancenextDirArrIDX(){
        if (nextDirArrIDX === 3){
            nextDirArrIDX = 0;
        }else{
            nextDirArrIDX++;
        }
    }

    // Flips direction to opposite
    function flipDir(){
        switch (direction){
            case 'R':
                direction = 'L';
            break;
            case 'L':
                direction = 'R';
            break;
            case 'U':
                direction = 'D';
            break;
            case 'D':
                direction = 'U';
            break;
        }
    }

    // Returns posn coresponding to moving in direction from origin. Not guaranteed legal
    function generateNewMove(origin){
        switch (direction){
            case 'R':
                return posnFactory(origin.x+1, origin.y);
            case 'L':
                return posnFactory(origin.x-1, origin.y);
            case 'U':
                return posnFactory(origin.x, origin.y+1);
            case 'D':
                return posnFactory(origin.x, origin.y-1);
        }
    }


    // Updates nextMove
    // current represents where the attack took place
    // Called when ship is HIT OR we found a ship but missed BEFORE we sunk it
    function updateNextMove(current, isHit){
        let dirLimit = 3; // Limiting the amount of options we should evaluate before giving up and taking first hit as origin (Ie. chase other way)

        // Figuring out what direction to take and where we should move from (lastHit)
        if (isHit){
            if (!firstHit) firstHit = current; //define first hit if it truly is the first one
            // Dont change direction
            lastHit = current;
        } else{ //MISS
            if (firstHit != lastHit){ //we missed after we had 2 hits on the ship; so go the other way
                lastHit = firstHit; 
                flipDir();
            } else { // Our one and only previous hit is the end piece of the ship. Try different dir.
                advancenextDirArrIDX();
                direction = nextDirArr[nextDirArrIDX];
            }
        }
        
        let candidate = generateNewMove(lastHit);

        // Verify is on board
        while (candidate.x > GAMEBOARD_MAX_X || candidate.x < 0 || candidate.y > GAMEBOARD_MAX_Y || candidate.y < 0){
            advancenextDirArrIDX();
            direction = nextDirArr[nextDirArrIDX];
            candidate = generateNewMove(lastHit);
        }
     
        // Verify not somewhere we have shot before
        while (!verifyUnique(candidate)){ 
            dirLimit--;
            
            // Prevent infinite loop(edge case)
            // Update lastHit to actually be first hit
            if (dirLimit < 0) {
                lastHit = firstHit;
                dirLimit = 3;
            } 
            advancenextDirArrIDX();
            direction = nextDirArr[nextDirArrIDX];
            candidate = generateNewMove(lastHit);
        }
        // We are confident candidate is on board and unique, so it will be the next move
        nextMove = candidate; //TODO: Why we need this?
    }

    // Resets AI params. NOTE: Called as a method Ie. myPlayerObj.resetnextMove(). So we must use "this"
    function resetnextMove(){
        // nextMove = null;
        lastHit = false; 
        firstHit = false;
        nextDirArrIDX = 0;
        direction = 'R';
    }
   
    return {
        verifyUnique, updateNextMove, resetnextMove, board, nextMove, shots
    }
}


