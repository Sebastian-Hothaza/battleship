import { playerFactory } from './player.js';
import { posnFactory } from './posn.js';


describe('Player testing', () => {

    test('Creating a player', () => {
      expect(playerFactory().board.hits.length).toBe(0);
      expect(playerFactory().board.missed.length).toBe(0);
    });

    test('Taking 3 shots', () => {
        const myPlayer = playerFactory();
        myPlayer.board.receiveAttack(posnFactory(1,2));
        myPlayer.board.receiveAttack(posnFactory(1,3));
        myPlayer.board.receiveAttack(posnFactory(1,4));
        expect(myPlayer.board.missed.length).toBe(3);
      });


    test('Take a random shot', () => {
        const attacker = playerFactory();
        const victim = playerFactory();
        let targetPosn = attacker.getRandomTarget(victim.board);
        victim.board.receiveAttack(targetPosn);
        expect(victim.board.missed.length).toBe(1);
    });

    test('Shoot 10 random shots', () => {
        const attacker = playerFactory();
        const victim = playerFactory();
        for (let i=0; i<10; i++){
            let targetPosn = attacker.getRandomTarget(victim.board);
            victim.board.receiveAttack(targetPosn);
        }
        expect(victim.board.missed.length).toBe(10);
    });

    test('Shoot all spots on grid (assumes 10x10)', () => {
        const attacker = playerFactory();
        const victim = playerFactory();
        for (let i=0; i<100; i++){
            let targetPosn = attacker.getRandomTarget(victim.board);
            victim.board.receiveAttack(targetPosn);
        }
        const allShots = victim.board.missed.concat(victim.board.hits);
        expect(allShots.length).toBe(100);
    });
  
  
});