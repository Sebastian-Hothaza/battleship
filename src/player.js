
// const posn = require('./posn.js')
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from "./gameboard.js"
import { posnFactory } from "./posn.js"
export { playerFactory }

const playerFactory = () => {
    let shots = [] //Used by the AI as a way of preventing illegal moves

    // Randomly returns a valid posn to shoot at
    function getRandomTarget(){
        while (1){
            let candidatePosn = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)),
                                                Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
        
            // We've checked candiate posn against all known existing posn
            if (verifyUnique(candidatePosn)) {
                shots.push(candidatePosn)
                return candidatePosn;
            }
        }
    }

    // Verify that the candidate target is unique
    function verifyUnique(target){
        for (let i=0; i<shots.length; i++){ 
            if (shots[i].x === target.x && shots[i].y === target.y){ 
                return false;
            } 
        }
        return true;
    }

   
    return {
        getRandomTarget, shots  // shots shouldnt really be exported however it is for testing purposes (Jest)
    }
}
