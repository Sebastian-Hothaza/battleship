const player = require('./player.js')
const main = require('./main.js')


describe('Player testing', () => {

    test('Creating a player', () => {
      expect(player.playerFactory().shots.length).toBe(0);
    });

    test('Taking 3 shots', () => {
        const myPlayer = player.playerFactory();
        myPlayer.shots.push(main.posnFactory(1,2));
        myPlayer.shots.push(main.posnFactory(1,3));
        myPlayer.shots.push(main.posnFactory(1,4));
        expect(myPlayer.shots.length).toBe(3);
      });

    test('Take a random shot', () => {
        const myPlayer = player.playerFactory();
        let targetPosn = myPlayer.getRandomTarget();
        expect(myPlayer.shots.length).toBe(1);
        //check return type is posn?
    });

    test('Shoot 10 random shots', () => {
        const myPlayer = player.playerFactory();
        for (let i=0; i<10; i++){
            myPlayer.getRandomTarget();
        }
        expect(myPlayer.shots.length).toBe(10);
    });

    test('Shoot all spots on grid (assumes 10x10)', () => {
        const myPlayer = player.playerFactory();
        for (let i=0; i<100; i++){
            myPlayer.getRandomTarget();
        }
        expect(myPlayer.shots.length).toBe(100);
    });
  
  
});