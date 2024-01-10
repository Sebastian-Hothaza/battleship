import { gameboardFactory } from './gameboard.js';
import { posnFactory } from './posn.js';

describe('Ship testing', () => {
    test.todo("foo")
    
    test('building a gameboard', () => {
      expect(gameboardFactory()).toBeTruthy();
    });

    test('placing a valid ship', () => {
        const origin = posnFactory(0,0);
        const myBoard = gameboardFactory();
        expect(myBoard.placeShip(origin,'R', 5,false)).toBe(true);
    });

    test('placing ship with origin outside valid gameboard', () => {
        const badOriginMIN = posnFactory(-1,-1);
        const badOriginMAX = posnFactory(11,11);
        const myBoard = gameboardFactory();
        expect(myBoard.placeShip(badOriginMIN,'R', 5,false)).toBe(false);
        expect(myBoard.placeShip(badOriginMAX,'R', 5,false)).toBe(false);
    });

    test('placing ship which would spill outside valid gameboard', () => {
        const spillsRight = posnFactory(8,1);
        const spillsBottom = posnFactory(1,1);
        const myBoard = gameboardFactory();
        expect(myBoard.placeShip(spillsRight,true, 5,false)).toBe(false);
        expect(myBoard.placeShip(spillsBottom,false, 5,false)).toBe(false);

    });

    
    test('placing a ship which would overlap another ship', () => {
        const origin = posnFactory(0,0);
        const overlapHead = posnFactory(1,0);
        const farHead = posnFactory(7,0);
        const myBoard = gameboardFactory();
        expect(myBoard.placeShip(origin,'R', 5,false)).toBe(true);
        expect(myBoard.placeShip(overlapHead,'R', 5,false)).toBe(false);
        expect(myBoard.placeShip(overlapHead,'L', 5,false)).toBe(false);
    });

    test('Receive an attack', () => {
  
        const myBoard = gameboardFactory();
        myBoard.placeShip(posnFactory(0,0),'R', 5,false);
        myBoard.receiveAttack(posnFactory(0,0));
        myBoard.receiveAttack(posnFactory(4,0));
        myBoard.receiveAttack(posnFactory(5,0));

        expect(myBoard.missed.length).toBe(1);
    });

    test('Sink all ships', () => {
  
        const myBoard = gameboardFactory();
        myBoard.placeShip(posnFactory(0,0),'R', 2,false);
        myBoard.receiveAttack(posnFactory(0,0));
        expect(myBoard.allSunk()).toBe(false);
        myBoard.receiveAttack(posnFactory(1,0));
        expect(myBoard.allSunk()).toBe(true);
    });

    
  
});