

// Gameboards should keep track of missed attacks so they can display them properly.

const ship = require('./ship')
const main = require('./main')

//NOTE: Origin being taken as bottom left corner
const GAMEBOARD_MAX_X = 9;
const GAMEBOARD_MAX_Y = 9;

// ONLY board has concept of where a ship is
const gameboardFactory = () => {

    // Gameboard needs to know which ship occupies which spots
    let ships = []; // Tracks ships placed on the board. 
    let missed = []; // Array of missed shots

    
    // Given a posn and direction, attempts to place a ship of specified size. Returns true if placement is valid, false otherwise
    // Dir is given as oneOf(U,D,L,R). Ie. placeShip((0,0), R, 5) would be a ship with head at origin and spanning to right 5 blocks
    function placeShip(posn, dir, size){
        // Check that the posn is valid
        if (posn.x < 0 || posn.y < 0 || posn.x > GAMEBOARD_MAX_X || posn.y > GAMEBOARD_MAX_Y) return false;

        // Check that ship placement would not spill outside gameboard
        switch (dir){
            case 'L':
                if (posn.x - size < 0) return false;
                break;
            case 'R':
                if (posn.x + size > GAMEBOARD_MAX_X) return false;
                break;
            case 'U':
                if (posn.y + size > GAMEBOARD_MAX_Y) return false;
                break;
            case 'D':
                if (posn.y - size < 0) return false;
                break;
            default:
                return false;
        }

        // Checking that ship placement does not overlap with other ships
        const spacesOccupied = getShipSpaces(posn, dir, size);
        // Check that none of these spaces occupied coincide with any of spaces occupied by current ships
        
        for (let i=0; i<ships.length; i++){ // Go thru each ship
            for (let j=0; j<ships[i][1].length; j++){ // Go thru each ships occupied spaces array
                for (let k=0; k<spacesOccupied.length; k++){ // For each of the ships coordinates, we check against each coordinate in the proposed ship
                    if (spacesOccupied[k].x === ships[i][1][j].x && spacesOccupied[k].y === ships[i][1][j].y ) return false;
                }
            }
        }


    
        // Creating and placing the ship
        ships.push( [ship.shipFactory(size), spacesOccupied] ); 
       
        
      
        return true;
    }

    // Returns an array of posn's corresponding to posns which would be occupied by the specified ship
    function getShipSpaces(head, dir, size){
        let result = [head]

        switch(dir){
            case 'L':
                for (let i=1; i<size; i++){
                    result.push(main.posnFactory(head.x-i,head.y))
                }
                break;
            case 'R':
                for (let i=1; i<size; i++){
                    result.push(main.posnFactory(head.x+i,head.y))
                }
                break;
            case 'U':
                for (let i=1; i<size; i++){
                    result.push(main.posnFactory(head.x,head.y+i))
                }
                break;
            case 'D':
                for (let i=1; i<size; i++){
                    result.push(main.posnFactory(head.x,head.y-i))
                }
                break;
            default:
                //TODO, throw error?
            
        }
        return result;
    }

    // Prints all ships and their locations to console
    function printShips(){
        for (let i=0; i<ships.length; i++){
            console.log("Ship ",i+1," has size ",ships[i][0].size)
            let coords = ""
            for (let j=0; j<ships[i][1].length; j++){
                coords+="(" + (ships[i][1][j].x) + ',' + (ships[i][1][j].y) + ') '
            }
            console.log("It occupies the following spaces: ", coords)
        }
    }

    // Returns an array of ship objects
    function getShips(){
        let result = [];
        for (let i=0; i<ships.length; i++){
            result.push(ships[i][0]);
        }
        return result;
    }

    //determines whether attack hit a ship, then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
    function receiveAttack(target){
        for (let i=0; i<ships.length; i++){
            for (let j=0; j<ships[i][1].length; j++){
                if (ships[i][1][j].x === target.x && ships[i][1][j].y === target.y){
                    ships[i][0].hit();
                    return;
                }
            }
        }
        missed.push(target)
    }

    // Returns true if all ships on board are sunk
    function allSunk(){
        for (let i=0; i<ships.length; i++){
            if (ships[i][0].isSunk() === false) return false;
        }
        return true;
    }

    return{
        placeShip, receiveAttack, getShips, allSunk, missed
    }
}


module.exports = { gameboardFactory }