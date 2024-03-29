import { playerFactory } from '../src/player.js';
import { posnFactory } from '../src/posn.js';

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
        let candidatePosn;
        
        while (!candidatePosn || !attacker.verifyUniqueShot(candidatePosn, victim.board)){
            candidatePosn = posnFactory( Math.floor(Math.random() * (9+1)),
                                                Math.floor(Math.random() * (9+1)));
        }
        victim.board.receiveAttack(candidatePosn);

        expect(victim.board.missed.length).toBe(1);
    });

    test('Shoot 10 random shots', () => {
        const attacker = playerFactory();
        const victim = playerFactory();
        let candidatePosn;

        for (let i=0; i<10; i++){
            while (!candidatePosn || !attacker.verifyUniqueShot(candidatePosn, victim.board)){
                candidatePosn = posnFactory( Math.floor(Math.random() * (9+1)),
                                                Math.floor(Math.random() * (9+1)));
                }
            victim.board.receiveAttack(candidatePosn);
        }
        expect(victim.board.missed.length).toBe(10);
    });

    test('Shoot all spots on grid', () => {
        const attacker = playerFactory();
        const victim = playerFactory();
        let candidatePosn;

        for (let i=0; i<((9+1) * (9+1)); i++){
            while (!candidatePosn || !attacker.verifyUniqueShot(candidatePosn, victim.board)){
                candidatePosn = posnFactory( Math.floor(Math.random() * (9+1)),
                                                    Math.floor(Math.random() * (9+1)));
            }
            victim.board.receiveAttack(candidatePosn);
        }
        const allShots = victim.board.missed.concat(victim.board.hits);
        expect(allShots.length).toBe((9+1) * (9+1));
    });
  
  
});

