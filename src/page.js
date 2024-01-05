import {  GAMEBOARD_MAX_X, GAMEBOARD_MAX_Y } from "./gameboard";
import { personGB, computerGB } from "./main"

export {loadSite, updateBoards, drawPersonShip}


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
   

    const personGrid = createGrid();
    personGrid.id = 'personGrid';
    content.appendChild(personGrid);
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
    for (let i=0; i<computerGB.missed.length; i++){ // go thru missed array (array of posns)
        computerCells[(10*(9 - computerGB.missed[i].y) + computerGB.missed[i].x)].classList.add('miss');
    }
    //console.log(computerGB.hits[0].x);
    for (let i=0; i<computerGB.hits.length; i++){ // go thru missed array (array of posns)
        computerCells[(10*(9 - computerGB.hits[i].y) + computerGB.missed[i].x)].classList.add('hit');
    }
    
    // Update person grid to show misses and hits
    for (let i=0; i<personGB.missed.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - personGB.missed[i].y) + personGB.missed[i].x)].classList.add('miss');
    }
    for (let i=0; i<personGB.hits.length; i++){ // go thru missed array (array of posns)
        personCells[(10*(9 - personGB.hits[i].y) + personGB.missed[i].x)].classList.add('hit');
    }
    
}

function drawPersonShip(){
    const cells = document.getElementById('personGrid').childNodes; 
    // ships is array which keeps track of all ship objects on the board. For each ship we call ships[i][1] which returns array of spaces occupied by that ship
    const spacesOccupied = personGB.getOccupiedSpaces(); // array of posns
    console.log(spacesOccupied);
    for (let i=0; i<spacesOccupied.length; i++){
        cells[(10*(9 - spacesOccupied[i].y) + spacesOccupied[i].x)].classList.add('ship');
    }
}