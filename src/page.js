import { person, computer, play, loadBoards } from "./game"
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from './constants.js';

export { loadSite }


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
    let cells = computerGrid.children;
    for (let childIDX=0; childIDX<cells.length; childIDX++){
        cells[childIDX].addEventListener('mousedown', (e) => {
            e.preventDefault();
            play(childIDX); 
            updateBoards(); 
            //TODO: game should export a var (Ie. game status) so the DOM can import it and use to update header.
        });
    }
    
   

    const personGrid = createGrid();
    personGrid.id = 'personGrid';
    content.appendChild(personGrid);

    content.appendChild(createFooter());

    loadBoards();  
    drawPersonShip();
    drawComputerShip();

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

// Updates both gameboards to reflect hits/misses
function updateBoards(){
    const computerCells = document.getElementById('computerGrid').childNodes; // 0 to 99
    const personCells = document.getElementById('personGrid').childNodes; 

    // Update computer grid to show misses and hits
    for (let i=0; i<computer.board.missed.length; i++){ // go thru missed array (array of posns)
        computerCells[(10*(9 - computer.board.missed[i].y) + computer.board.missed[i].x)].classList.add('miss');
    }
    for (let i=0; i<computer.board.hits.length; i++){ // go thru hits array (array of posns)
        computerCells[(10*(9 - computer.board.hits[i].y) + computer.board.hits[i].x)].classList.add('hit');
    }
    
    // Update person grid to show misses and hits
    for (let i=0; i<person.board.missed.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - person.board.missed[i].y) + person.board.missed[i].x)].classList.add('miss');
    }
    for (let i=0; i<person.board.hits.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - person.board.hits[i].y) + person.board.hits[i].x)].classList.add('hit');
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