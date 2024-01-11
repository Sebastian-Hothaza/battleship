import { shipFactory } from "./ship";

describe('Ship testing', () => {

    test('building a ship with defined size', () => {
      expect(shipFactory(10).size).toBe(10);
    });
  
    test('building a ship with undefined size', () => {
      expect(shipFactory(0).size).toBe(0);
    });
  
    test('Hit detection - not sunk', () => {
      const myShip = shipFactory(3);
      myShip.hit();
      expect(myShip.isSunk()).toBe(false);
    });
  
    test('Hit detection - sunk', () => {
      const myShip = shipFactory(3);
      myShip.hit();
      myShip.hit();
      myShip.hit();
      expect(myShip.isSunk()).toBe(true);
    });
  
});