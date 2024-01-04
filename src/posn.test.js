const posn = require('./posn.js')

describe('Posn testing', () => {
  test('create a posn', () =>{
    const myPosn = posn.posnFactory(4,5);
    expect(myPosn.x).toBe(4);
    expect(myPosn.y).toBe(5);
  });
});