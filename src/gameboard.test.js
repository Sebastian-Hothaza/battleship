const gameboard = require('./gameboard')

describe('Ship testing', () => {

    test('building a gameboard', () => {
      expect(gameboard.gameboardFactory(10).size).toBe(10);
    });
  
  
});