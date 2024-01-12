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
    const nextDirArr = ['R', 'L', 'U', 'D'];    // Used by AI: possible directions to consider
    let nextDirArrIDX = 0;                      // Used by AI: cycling thru nextDirArr
    let direction = 'R';                        // Used by AI: starting direction to probe

    // Verify that target has not been shot at before
    function verifyUniqueShot(target){
        for (let i=0; i<shots.length; i++){ 
            if (shots[i].x === target.x && shots[i].y === target.y) return false;
        }
        return true;
    }

    // Given a current posn, updates nextMove based on if isHit
    // Called when ship is HIT OR we found a ship but missed a shot BEFORE we sunk it
    function updateNextMove(current, isHit){
        let loopCount = 0; 
        // Setting the direction to take and where we should move FROM (lastHit)
        if (isHit){ //HIT - don't change direction UNLESS continue would put you off the map
            if (!firstHit){
                firstHit = current; //define first hit if it truly is the first one
            }
            lastHit = current;
        } else{ //MISS - need to try different direction OR chase back
            if (firstHit == lastHit){   // Our one and only previous hit is the end piece of the ship. Try different dir.
                nextDirArrIDX = (nextDirArrIDX+1)%nextDirArr.length;
                direction = nextDirArr[nextDirArrIDX];
            } else {                    //missed after 2 hits on the ship; chase back 
                lastHit = firstHit;     //take first hit as new reference point
                flipDir();
                nextMove = generateNewPosn(lastHit);
                while (!verifyUniqueShot(nextMove)) { //Skip over previously hit squares
                    nextMove = generateNewPosn(nextMove); 
                }
                return; 
            }
        }

        // We know the direction to proceed in and from where
        let candidate = generateNewPosn(lastHit);

        // Verify candidate is on board and not somwhere we have shot before
        while (candidate.x > GAMEBOARD_MAX_X || candidate.x < 0 || candidate.y > GAMEBOARD_MAX_Y || candidate.y < 0 || !verifyUniqueShot(candidate)){
            loopCount++;
            if (loopCount>3){ // Unique edge cases exit
                resetnextMove();
                return;
            }
            if (firstHit != lastHit){   //Offmap after 2 hits on the ship; chase back. 
                lastHit = firstHit;     //take first hit as new reference point
                flipDir();
                nextMove = generateNewPosn(lastHit);
                while (!verifyUniqueShot(nextMove)) { //Skip over previously hit squares
                    nextMove = generateNewPosn(nextMove); 
                }
                return; // We are chasing back - safe to return directly
            }

            // Try a different direction
            nextDirArrIDX = (nextDirArrIDX+1)%nextDirArr.length
            
            direction = nextDirArr[nextDirArrIDX];
            candidate = generateNewPosn(lastHit);
        }
        nextMove = candidate; // We are confident candidate is on board and unique, so it will be the next move
    }

    // Resets AI params
    function resetnextMove(){
        nextMove = null;
        lastHit = false; 
        firstHit = false;
        nextDirArrIDX = 0;
        direction = 'R';
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
    function generateNewPosn(origin){
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

    return {
        verifyUniqueShot, updateNextMove, resetnextMove, board, shots, get nextMove(){return nextMove;}, set nextMove(newnextMove){nextMove=newnextMove}
    }
}


