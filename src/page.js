import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y, shipSizes } from './constants.js'; 
import { posnFactory } from "./posn.js";
import { person, computer, play, loadComputerBoard } from "./game"

export { loadSite }

let shipSizesIDX = 0;       // Tracks which ship we are currently working on
let horizontal = true;      // Used for ship placement
let gameStarted = false;    // True when player has placed all their ships
let gameOver = false;       // True when a winner has been decided
let winner=null;            // { null, person, computer }

// Loads components; called by main.js
function loadSite(){
    const content = document.querySelector('#content');

    // HEADER
    content.appendChild(createHeader());

    // GRID LABELS
    content.appendChild(createLabel('Enemy'));
    content.appendChild(createLabel('Your Fleet'));

    // GRIDS
    content.appendChild(createComputerGrid());
    content.appendChild(createPersonGrid());

    // FOOTER
    content.appendChild(createFooter());

    // Placing computer ships
    loadComputerBoard();
}

// Returns div corresponding to header
function createHeader(){
    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = "BATTLESHIP";
    return header;
}

// Return div corresponding to grid label
function createLabel(text){
    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = text;
    return label;
}

// Returns div corresponding to a grid
function createGrid(){
    const grid = document.createElement('div');
    grid.classList.add('grid')

    // Create cells
    for (let i=0; i<(GAMEBOARD_MAX_X+1)*(GAMEBOARD_MAX_Y+1); i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
    return grid;
}

// Returns div corresponding to computerGrid
function createComputerGrid(){
    const grid = createGrid();
    grid.id = 'computerGrid';
    
    // computerGrid Listeners 
    for (let childIDX=0; childIDX<grid.children.length; childIDX++){
        grid.children[childIDX].addEventListener('click', (e) => {
            e.preventDefault();
            if (gameStarted && !gameOver){
                winner = play(posnFactory(childIDX%10, 9 - parseInt(childIDX/10))); // Returns winner or null
                updateBoards();
                if (winner === person){
                    gameOver = true;
                    updateFooter()
                } else if (winner === computer){
                    gameOver = true;
                    updateFooter()
                    drawShips('computerGrid');
                }
            }
        });
        grid.children[childIDX].addEventListener('mouseenter', (e) => {
            if (gameStarted && !gameOver) grid.children[childIDX].classList.add('hover')
        });
        grid.children[childIDX].addEventListener('mouseleave', (e) => {
            if (gameStarted && !gameOver) grid.children[childIDX].classList.remove('hover')
        });
    }
    return grid;
}

// Returns div corresponding to personGrid
function createPersonGrid(){
    // GRIDS -- PERSON
    const grid = createGrid();
    grid.id = 'personGrid';
    
    // personGrid Listeners 
    for (let childIDX=0; childIDX<grid.children.length; childIDX++){
        grid.children[childIDX].addEventListener('click', (e) => {
            e.preventDefault();
            // If gameStarted, try to placeShip at current location
            if (!gameStarted && person.board.placeShip(posnFactory(childIDX%10,9 - parseInt(childIDX/10)), horizontal, shipSizes[shipSizesIDX], false)){
                // Placed ship successfully 
                updateConsideredShip(childIDX, false) //wipe out the preview for that ship
                drawShips('personGrid');
                shipSizesIDX++; // Advancing to next ship to place
                if (shipSizesIDX >= shipSizes.length){
                    // All ships now placed
                    gameStarted=true;
                    updateFooter();
                }
            }
        });
        grid.children[childIDX].addEventListener('contextmenu', (e) => {
            e.preventDefault();
            updateConsideredShip(childIDX,false); // Remove current preview
            horizontal = !horizontal;
            updateConsideredShip(childIDX,true);  // Draw new preview
        });
        
        grid.children[childIDX].addEventListener('mouseenter', (e) => {
            if (!gameStarted) updateConsideredShip(childIDX, true); 
        });

        grid.children[childIDX].addEventListener('mouseleave', (e) => {
            if (!gameStarted) updateConsideredShip(childIDX, false);
        });
    }
    return grid;
}

// Returns div corresponding to footer
function createFooter(){
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.id = 'footer';
    footer.textContent = "Place your ships (right click to rotate)";
    return footer;
}

// Updates footer with relevant info
// Footer has 3 possible states: setup, ingame, endgame
// Setup is default/preloaded state
function updateFooter(){
    const footer = document.getElementById('footer')
    if (!gameOver){
        // show encouraging text
        footer.textContent = 'Fortune favours the bold...'
         
    } else {
        // Show winner and restart button
        winner === person? footer.textContent = 'Congratulations admiral, we have won!' : footer.textContent = 'We may have lost the battle, but the war rages on'
        const restartBtn = document.createElement('button');
        restartBtn.textContent = "Next battle";
        restartBtn.addEventListener('click', (e) => {
            location.reload();
        });
        footer.appendChild(restartBtn);
    }
}

// Updates grid to draw/wipe considered ships on hover
function updateConsideredShip(IDX, draw){
    const cells = document.getElementById('personGrid').children;
    let cellIDX; // Tracks cell we are modifying
    for (let i=0; i<shipSizes[shipSizesIDX]; i++){ // Drawing each cell of the ship we are currently placing
        horizontal? cellIDX = IDX + i: cellIDX = IDX + i*10 
        if ((horizontal && parseInt(IDX/10) !== parseInt(cellIDX/10)) || cellIDX>99) continue; // Spill over detection
        if (draw && person.board.placeShip(posnFactory(IDX%10, 9 - parseInt(IDX/10)),horizontal,shipSizes[shipSizesIDX],true)){
            // DRAW VALID PLACEMENT
            cells[cellIDX].classList.remove('hover_consider_invalid')
            cells[cellIDX].classList.add('hover_consider_valid')
        }else if (draw) {
            // DRAW INVALID PLACEMENT
            cells[cellIDX].classList.remove('hover_consider_valid')
            cells[cellIDX].classList.add('hover_consider_invalid')
        } else{
            // ERASE
            cells[cellIDX].classList.remove('hover_consider_invalid')
            cells[cellIDX].classList.remove('hover_consider_valid')
        }
    }        
}

// Updates both gameboards to reflect hits/misses/sunken ship
function updateBoards(){
    const computerCells = document.getElementById('computerGrid').childNodes;
    const personCells = document.getElementById('personGrid').childNodes; 

    // Build sunkenShips array based off of ships array
    let computerSunkenShips = getSunkenPosns(computer.board.ships)
    let personSunkenShips = getSunkenPosns(person.board.ships)

    // Update computer grid to show misses, hits and sink
    for (let i=0; i<computer.board.missed.length; i++){ // go thru missed array (array of posns)
        computerCells[(10*(9 - computer.board.missed[i].y) + computer.board.missed[i].x)].classList.add('miss');
    }
    for (let i=0; i<computer.board.hits.length; i++){ // go thru hits array (array of posns)
        computerCells[(10*(9 - computer.board.hits[i].y) + computer.board.hits[i].x)].classList.add('hit');
    }
    for (let i=0; i<computerSunkenShips.length; i++){ // go thru sunkenShips array (array of posns)
        computerCells[(10*(9 - computerSunkenShips[i].y) + computerSunkenShips[i].x)].classList.add('sunk');
    }

    // Update person grid to show misses, hits and sink
    for (let i=0; i<person.board.missed.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - person.board.missed[i].y) + person.board.missed[i].x)].classList.add('miss');
    }
    for (let i=0; i<person.board.hits.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - person.board.hits[i].y) + person.board.hits[i].x)].classList.add('hit');
    } 
    for (let i=0; i<personSunkenShips.length; i++){ // go thru sunkenShips array (array of posns)
        personCells[(10*(9 - personSunkenShips[i].y) + personSunkenShips[i].x)].classList.add('sunk');
    } 
}

// Draws the ships on given grid
function drawShips(grid){
    const cells = document.getElementById(grid).childNodes; 
    let spacesOccupied;// array of posns occupied by ships on provided grid

    grid == 'personGrid'? spacesOccupied = getOccupiedSpaces(person.board) :  spacesOccupied = getOccupiedSpaces(computer.board)
    for (let i=0; i<spacesOccupied.length; i++){
        cells[(10*(GAMEBOARD_MAX_Y - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');
    }
}

// Given an array of ships, returns an array of posns which have a sunken ship on them
function getSunkenPosns(ships){
    let result = [];
    for (let i=0; i<ships.length; i++){
        if (ships[i][0].isSunk()){
            for (let k=0; k<ships[i][1].length; k++){
                result.push(ships[i][1][k])
            }
        }
    }
    return result;
}

// Given a board, returns an array of posns corresponding to spaces occupied by all ships
function getOccupiedSpaces(board){
    let result = [];
    for (let i=0; i<board.ships.length; i++){ // Go thru all ships on board
        for (let j=0; j<board.ships[i][1].length; j++){ // For each ship, go thru all posns 
            result.push(board.ships[i][1][j]);
        }
    }
    return result;
}