// TODO: Figure out why "this" is needed!
import { gameboardFactory } from "./gameboard.js"
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from "./main.js";
import { posnFactory } from "./posn.js";
export { playerFactory }

const playerFactory = () => {
    let board = gameboardFactory(); // Board associated with the player
    let shots = [] // Array of posns tracking shots taken by player

    let nextMove = false; // Used by AI

    let lastHit = false; // Tracks last known hit by AI
    let firstHit = false; // Tracks the posn of where we first struck the ship
    const nextDirArr = ['R', 'L', 'U', 'D']; // Used by AI
    let nextDirArrIDX = 0; // Used by AI
    let direction = 'R';

    // Verify that the candidate target is a unique shot within targetGB 
    function verifyUnique(target, targetGB){
        let allShots = targetGB.missed.concat(targetGB.hits); //array of posns that
        for (let i=0; i<allShots.length; i++){ 
            if (allShots[i].x === target.x && allShots[i].y === target.y){ 
                return false;
            } 
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

    // Returns posn coresponding to moving in direction from origin
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

    // given a candidate posn, return true if we have ever shot there before
    function verifyUniqueNewMove(candidate){
        for (let i=0; i<shots.length; i++){
            if (candidate.x === shots[i].x && candidate.y === shots[i].y) return false;
        }
        return true;
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
        while (!verifyUniqueNewMove(candidate)){ 
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
        this.nextMove = candidate;
    }

    function resetnextMove(){
        lastHit = false; 
        firstHit = false;
        nextDirArrIDX = 0;
        direction = 'R';
    }
   
    return {
        verifyUnique, updateNextMove, resetnextMove, board, nextMove, shots
    }
}


