import { person, computer, play, loadComputerBoards } from "./game"
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y, shipSizes } from './constants.js'; //shipSizes = [5,4,3,3,2];
import { posnFactory } from "./posn.js";

export { loadSite }

let shipSizesIDX = 0;
let horizontal = true;
let gameStarted = false;
let gameOver = false;

// TODO: Add rotate button

function loadSite(){
    const content = document.querySelector('#content');

    content.appendChild(createHeader());

    const opponentLabel = document.createElement('div');
    opponentLabel.classList.add('label');
    opponentLabel.textContent = "OPPONENT";
    content.appendChild(opponentLabel);

    const youLabel = document.createElement('div');
    youLabel.classList.add('label');
    youLabel.textContent = "YOU";
    content.appendChild(youLabel);

    const computerGrid = createGrid();
    computerGrid.id = 'computerGrid';
    content.appendChild(computerGrid);
    // Attach listeners to computer grid
    let computerCells = computerGrid.children;
    for (let childIDX=0; childIDX<computerCells.length; childIDX++){
        computerCells[childIDX].addEventListener('mousedown', (e) => {
            e.preventDefault();// TODO: What does this do?
            if (gameStarted && !gameOver){
                let winner = play(childIDX); // Returns winner or null(same as nothign?)
                updateBoards();
                if (winner === person){
                    console.log("PERSON WINS")
                    gameOver = true;
                } else if (winner === computer){
                    console.log("COMPUTER WINS")
                    gameOver = true;
                }
            }
            
            //TODO: game should export a var (Ie. game status) so the DOM can import it and use to update header.
        });

        computerCells[childIDX].addEventListener('mouseenter', (e) => {
            e.preventDefault();
            if (gameStarted && !gameOver) computerCells[childIDX].classList.add('hover')
        });

        computerCells[childIDX].addEventListener('mouseleave', (e) => {
            e.preventDefault();
            if (gameStarted && !gameOver) computerCells[childIDX].classList.remove('hover')
        });
    }

    const personGrid = createGrid();
    personGrid.id = 'personGrid';
    content.appendChild(personGrid);

    // Attach listeners to person grid - used for placing of person ships at game start
    let personCells = personGrid.children;
    for (let childIDX=0; childIDX<personCells.length; childIDX++){
        personCells[childIDX].addEventListener('mousedown', (e) => {
            e.preventDefault();// TODO: What does this do?
            if (!gameStarted && person.board.placeShip(posnFactory(childIDX%10, 9 - parseInt(childIDX/10)), horizontal, shipSizes[shipSizesIDX], false)){
                // Placed ship successfully 
                updateConsideredShip(childIDX, false) //wipe out the preview for that ship
                drawPersonShip();
                shipSizesIDX++;
                if (shipSizesIDX >= shipSizes.length) gameStarted=true;
            }
        });

        
        personCells[childIDX].addEventListener('mouseenter', (e) => {
            e.preventDefault();
            if (!gameStarted) updateConsideredShip(childIDX, true); 
        });

        personCells[childIDX].addEventListener('mouseleave', (e) => {
            e.preventDefault();
            if (!gameStarted) updateConsideredShip(childIDX, false);
        });
    }

    content.appendChild(createFooter());

    loadComputerBoards(); // game.js handles 
    // drawComputerShip(); //TODO: Dev use only, remove
}

// Updates grid to draw/wipe considered ships on hover
function updateConsideredShip(IDX, draw){
    const cells = document.getElementById('personGrid').children;
    for (let i=0; i<shipSizes[shipSizesIDX]; i++){
        let newIDX;
        horizontal? newIDX = IDX + i: newIDX = IDX + i*10 
        if ((horizontal && parseInt(IDX/10) !== parseInt(newIDX/10)) || newIDX>99) continue; // Spill over detection
        if (draw && person.board.placeShip(posnFactory(IDX%10, 9 - parseInt(IDX/10)),horizontal,shipSizes[shipSizesIDX],true)){
            // VALID DRAW
            cells[newIDX].classList.remove('hover_consider_invalid')
            cells[newIDX].classList.add('hover_consider_valid')
        }else if (draw) {
            // INVALID DRAW
            cells[newIDX].classList.remove('hover_consider_valid')
            cells[newIDX].classList.add('hover_consider_invalid')
        } else{
            // ERASE
            cells[newIDX].classList.remove('hover_consider_invalid')
            cells[newIDX].classList.remove('hover_consider_valid')
        }
    }        
}


// Returns div corresponding to header
function createHeader(){
    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = "BATTLESHIP";
    return header;
}

// Returns div corresponding to footer
function createFooter(){
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.textContent = "footer";
    return footer;
}

// Returns div corresponding to a grid
function createGrid(){
    const grid = document.createElement('div');
    grid.classList.add('grid')

    // Create cells
    for (let i=0; i< (GAMEBOARD_MAX_X+1)*(GAMEBOARD_MAX_Y+1); i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
    return grid;
}

// Updates both gameboards to reflect hits/misses/sunken ship
function updateBoards(){
    const computerCells = document.getElementById('computerGrid').childNodes; // 0 to 99
    const personCells = document.getElementById('personGrid').childNodes; 

    // Update computer grid to show misses, hits and sink
    for (let i=0; i<computer.board.missed.length; i++){ // go thru missed array (array of posns)
        computerCells[(10*(9 - computer.board.missed[i].y) + computer.board.missed[i].x)].classList.add('miss');
    }
    for (let i=0; i<computer.board.hits.length; i++){ // go thru hits array (array of posns)
        computerCells[(10*(9 - computer.board.hits[i].y) + computer.board.hits[i].x)].classList.add('hit');
    }
    for (let i=0; i<computer.board.sunkenShips.length; i++){ // go thru sunkenShips array (array of posns)
        computerCells[(10*(9 - computer.board.sunkenShips[i].y) + computer.board.sunkenShips[i].x)].classList.add('sunk');
    }

    
    // Update person grid to show misses, hits and sink
    for (let i=0; i<person.board.missed.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - person.board.missed[i].y) + person.board.missed[i].x)].classList.add('miss');
    }
    for (let i=0; i<person.board.hits.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - person.board.hits[i].y) + person.board.hits[i].x)].classList.add('hit');
    } 
    for (let i=0; i<person.board.sunkenShips.length; i++){ // go thru sunkenShips array (array of posns)
        personCells[(10*(9 - person.board.sunkenShips[i].y) + person.board.sunkenShips[i].x)].classList.add('sunk');
    } 
}


// Marks miss at a given idx for a given GameBoard
function markCell(GB, type, idx){
    let cells;
    if (GB === person.board){
        cells = document.getElementById('personGrid').childNodes;
    } else {
        cells = document.getElementById('computerGrid').childNodes;
    }
    
    cells[idx].classList.add(type);
}



function drawPersonShip(){
    const cells = document.getElementById('personGrid').childNodes; 
    // ships is array which keeps track of all ship objects on the board. For each ship we call ships[i][1] which returns array of spaces occupied by that ship
    const spacesOccupied = person.board.getOccupiedSpaces(); // array of posns
    for (let i=0; i<spacesOccupied.length; i++){
        cells[(10*(GAMEBOARD_MAX_Y - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');
    }
}

// DEV USE ONLY
function drawComputerShip(){
    const cells = document.getElementById('computerGrid').childNodes; 
    // ships is array which keeps track of all ship objects on the board. For each ship we call ships[i][1] which returns array of spaces occupied by that ship
    const spacesOccupied = computer.board.getOccupiedSpaces(); // array of posns
    for (let i=0; i<spacesOccupied.length; i++){
        cells[(10*(GAMEBOARD_MAX_Y - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');
    }
}

