const gameboard = require('./gameboard')
const main = require('./main')

describe('Ship testing', () => {

    test('building a gameboard', () => {
      expect(gameboard.gameboardFactory()).toBeTruthy();
    });

    test('placing a valid ship', () => {
        const origin = main.posnFactory(0,0);
        const myBoard = gameboard.gameboardFactory();
        expect(myBoard.placeShip(origin,'R', 5)).toBe(true);
    });

    test('placing ship with origin outside valid gameboard', () => {
        const badOriginMIN = main.posnFactory(-1,-1);
        const badOriginMAX = main.posnFactory(11,11);
        const myBoard = gameboard.gameboardFactory();
        expect(myBoard.placeShip(badOriginMIN,'R', 5)).toBe(false);
        expect(myBoard.placeShip(badOriginMAX,'R', 5)).toBe(false);
    });

    test('placing ship which would spill outside valid gameboard', () => {
        const bottomLeft = main.posnFactory(1,1);
        const bottomRight = main.posnFactory(8,1);
        const topLeft = main.posnFactory(1,8);
        const topRight = main.posnFactory(8,8);
        const myBoard = gameboard.gameboardFactory();


        expect(myBoard.placeShip(bottomLeft,'L', 5)).toBe(false);
        expect(myBoard.placeShip(bottomLeft,'D', 5)).toBe(false);

        expect(myBoard.placeShip(bottomRight,'R', 5)).toBe(false);
        expect(myBoard.placeShip(bottomRight,'D', 5)).toBe(false);

        expect(myBoard.placeShip(topLeft,'L', 5)).toBe(false);
        expect(myBoard.placeShip(topLeft,'U', 5)).toBe(false);

        expect(myBoard.placeShip(topRight,'R', 5)).toBe(false);
        expect(myBoard.placeShip(topRight,'U', 5)).toBe(false);
    });

    
    test('placing a ship which would overlap another ship', () => {
        const origin = main.posnFactory(0,0);
        const overlapHead = main.posnFactory(1,0);
        const farHead = main.posnFactory(7,0);
        const myBoard = gameboard.gameboardFactory();
        expect(myBoard.placeShip(origin,'R', 5)).toBe(true);
        expect(myBoard.placeShip(overlapHead,'R', 5)).toBe(false);
        expect(myBoard.placeShip(overlapHead,'L', 5)).toBe(false);
    });

    test('Receive an attack', () => {
  
        const myBoard = gameboard.gameboardFactory();
        myBoard.placeShip(main.posnFactory(0,0),'R', 5);
        myBoard.receiveAttack(main.posnFactory(0,0));
        myBoard.receiveAttack(main.posnFactory(4,0));
        myBoard.receiveAttack(main.posnFactory(5,0));

        expect(myBoard.missed.length).toBe(1);
    });

    test('Sink all ships', () => {
  
        const myBoard = gameboard.gameboardFactory();
        myBoard.placeShip(main.posnFactory(0,0),'R', 2);
        myBoard.receiveAttack(main.posnFactory(0,0));
        expect(myBoard.allSunk()).toBe(false);
        myBoard.receiveAttack(main.posnFactory(1,0));
        expect(myBoard.allSunk()).toBe(true);
    });
  
  
});