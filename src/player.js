import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y, gameboardFactory } from "./gameboard.js"
import { posnFactory } from "./posn.js"
export { playerFactory }

const playerFactory = () => {
    let board = gameboardFactory(); // Board associated with the player

    // Randomly returns a valid posn to shoot at a targetGB. Used by computer player for generating targets
    // Calls verifyUnique
    function getRandomTarget(targetGB){ 
        while (1){
            let candidatePosn = posnFactory( Math.floor(Math.random() * (GAMEBOARD_MAX_X+1)),
                                                Math.floor(Math.random() * (GAMEBOARD_MAX_Y+1)));
            if (verifyUnique(candidatePosn, targetGB)) return candidatePosn;
        }
    }

    // Verify that the candidate target is a unique shot within targetGB 
    // Called by getRandomTarget
    function verifyUnique(target, targetGB){
        let allShots = targetGB.missed.concat(targetGB.hits); //array of posns that
        for (let i=0; i<allShots.length; i++){ 
            if (allShots[i].x === target.x && allShots[i].y === target.y){ 
                return false;
            } 
        }
        return true;
    }
   
    return {
        getRandomTarget, board
    }
}
