import { posnFactory } from "../src/posn";

describe('Posn testing', () => {
  test('create a posn', () =>{
    const myPosn = posnFactory(4,5);
    expect(myPosn.x).toBe(4);
    expect(myPosn.y).toBe(5);
  });
});