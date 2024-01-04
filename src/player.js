
// const posn = require('./posn.js')
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from "./gameboard.js"
import { posnFactory } from "./posn.js"
export { playerFactory }

const playerFactory = () => {
    let shots = []

    // Randomly returns a valid posn to shoot at
    function getRandomTarget(){
        while (1){
            let candidatePosn = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)),
                                                Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
            let unique = true; // We assume that the generated candidate is unique     

            // Verify that the candidate posn is unique
            for (let i=0; i<shots.length; i++){ 
                if (shots[i].x === candidatePosn.x && shots[i].y === candidatePosn.y){ 
                    unique = false;
                    break;
                } 
            }
            // We've checked candiate posn against all known existing posn
            if (unique) {
                shots.push(candidatePosn)
                return candidatePosn;
            }
        }
    }

    return {
        shots, getRandomTarget
    }
}
