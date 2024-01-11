import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from './constants.js';
import { shipFactory } from './ship.js'
import { posnFactory } from './posn.js'

export { gameboardFactory }

const gameboardFactory = () => {
    let ships = [];         // Tracks ship objects placed on the board. Ie. ships[0] = [ship obj, array of posns occupied by ship object]
    let hits = [];          // Array of hit shot posn's
    let missed = [];        // Array of missed shot posn's

    // Given a posn and direction, attempts to place a ship of specified size. Returns true and places ship if placement is valid, false otherwise
    // Ie. placeShip((0,0), true, 5, false) would be a ship with head at origin and spanning to right 5 blocks
    // If queryONLY, ship won't be placed
    function placeShip(posn, horizontal, size, queryONLY){
        if (posn.x < 0 || posn.y < 0 || posn.x > GAMEBOARD_MAX_X || posn.y > GAMEBOARD_MAX_Y) return false;

        // Check that ship placement would not spill outside gameboard
        if (horizontal && posn.x + size > GAMEBOARD_MAX_X+1) return false; //horizontal going right
        if (!horizontal && posn.y - size < -1) return false; // vertical going down
            
        // Checking that ship we want to place does not overlap with other ships
        const spacesOccupied = getSpacesOccupiedByShip(posn, horizontal, size); // Spaces our candidate ship would occupy
        // Check that none of these spaces occupied coincide with any of spaces occupied by current ships
        for (let i=0; i<ships.length; i++){ // Go thru each ship
            for (let j=0; j<ships[i][1].length; j++){ // Go thru each ships occupied spaces array
                for (let k=0; k<spacesOccupied.length; k++){ // For each of the ships coordinates, we check against each coordinate in the proposed ship
                    if (spacesOccupied[k].x === ships[i][1][j].x && spacesOccupied[k].y === ships[i][1][j].y ) return false;
                }
            }
        }

        // Creating and placing the ship
        if (!queryONLY) ships.push( [shipFactory(size), spacesOccupied] ); 
        return true;
    }

    //determines whether attack hit a ship, then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot for the gameboard
    //return the ship if the attack hit, else returns false
    function receiveAttack(target){
        for (let i=0; i<ships.length; i++){ // Checking each ship
            for (let j=0; j<ships[i][1].length; j++){ // Checking each position of each ship
                if (ships[i][1][j].x === target.x && ships[i][1][j].y === target.y){ //HIT
                    ships[i][0].hit();
                    hits.push(target);
                    return ships[i][0];
                }
            }
        }
        missed.push(target)
        return false;
    }

    // Returns true if all ships on board are sunk
    function allSunk(){
        for (let i=0; i<ships.length; i++){
            if (ships[i][0].isSunk() === false) return false;
        }
        return true;
    }

    // Returns an array of posn's corresponding to posns which would be occupied by the specified ship
    // Used internally by placeShip
    function getSpacesOccupiedByShip(head, horizontal, size){
        let result = [head]
        if (horizontal){ //horizontal going right
            for (let i=1; i<size; i++){
                result.push(posnFactory(head.x+i,head.y))
            }
        }else{ // vertical going down
            for (let i=1; i<size; i++){
                result.push(posnFactory(head.x,head.y-i))
            }
        }
        return result;
    }

    return{
        placeShip, receiveAttack, allSunk,  ships, missed, hits 
    }
}
