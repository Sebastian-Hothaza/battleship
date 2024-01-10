import { person, computer, play } from "./main"
import { GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from './constants.js';

export {loadSite, drawPersonShip, drawComputerShip, markCell, updateBoards}


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
        });
    }
    
   

    const personGrid = createGrid();
    personGrid.id = 'personGrid';
    content.appendChild(personGrid);

    content.appendChild(createFooter());
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
// function updateBoards(){
//     // Should these be moved out so that we aren't redefining them each time we call updateBoards?
//     const computerCells = document.getElementById('computerGrid').childNodes; // 0 to 99
//     const personCells = document.getElementById('personGrid').childNodes; 

//     // Update computer grid to show misses and hits
//     for (let i=0; i<computerGB.missed.length; i++){ // go thru missed array (array of posns)
//         computerCells[(10*(9 - computerGB.missed[i].y) + computerGB.missed[i].x)].classList.add('miss');
//     }
//     for (let i=0; i<computerGB.hits.length; i++){ // go thru missed array (array of posns)
//         computerCells[(10*(9 - computerGB.hits[i].y) + computerGB.hits[i].x)].classList.add('hit');
//     }
    
//     // Update person grid to show misses and hits
//     for (let i=0; i<personGB.missed.length; i++){ // go thru missed array (array of posns)
//         personCells[(10*(9 - personGB.missed[i].y) + personGB.missed[i].x)].classList.add('miss');
//     }
//     for (let i=0; i<personGB.hits.length; i++){ // go thru missed array (array of posns)
//         personCells[(10*(9 - personGB.hits[i].y) + personGB.missed[i].x)].classList.add('hit');
//     } 
// }


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

function updateBoards(){
    // console.log("UPDATE BOARDS")
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