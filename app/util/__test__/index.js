'use strict';

import assert    from 'assert';
import * as util from '../';

describe('util tests', () => {
    it('should load the utils', () => {
        assert.ok(util);
    });
  
    describe('addTalkerPoints', () => {
        it('should add points to the talker', () => {
            const points = 1;
            const talkers = [
                {
                    id: 1,
                    score: 0
                }
            ];
            const letters = [
                {
                    player: {
                        id: 2
                    },
                    letter: 'F' 
                },
                {
                    player: {
                        id: 1
                    },
                    letter: 'F' 
                }
            ];
            const result = util.addTalkerPoints(points, talkers, letters);
            assert.equal(1, result[0].score);
        });
    });
  
    describe('isPlayer', () => {
        it('should check if a object is a player object or not', () => {
            const player = {id: 1};
            let result   = util.isPlayer(player, player);
            assert.equal(true, result);
            result = util.isPlayer(player, {});
            assert.equal(false, result); 
        });
    });
  
    describe('addTalkerPoints', () => {
        it('should return number of letters provided by the provided talker', () => {
            const letters = [
                {
                    player: {
                        id: 2
                    },
                    letter: 'F' 
                },
                {
                    player: {
                        id: 1
                    },
                    letter: 'F' 
                }
            ];
            const talker = {
                id: 1
            };
            const result = util.getNumLetters(letters, talker);
            assert.equal(1, result);
        });
    });
  
    describe('addGuesserPoints', () => {
        it('should add points to a guesser', () => {
            const guesser = {
                score: 0
            };
            const result = util.addGuesserPoints(1, guesser);
            assert.equal(1, result.score);
        });
    });
    
    describe('shuffleImages', () => {
        it('should return an array', () => {
            const result = util.shuffleImages([{}, {}, {}]);
            assert.ok(Array.isArray(result));
        });
    });
    
    describe('shuffle', () => {
        it('should return an array', () => {
            const result = util.shuffle([1, 2, 3]);
            assert.ok(Array.isArray(result));
        });
    });
  
    describe('randomLetters', () => {
        it('should return an array', () => {
            const result = util.randomLetters();
            assert.ok(Array.isArray(result));
        });
    });
  
    describe('randomHexColor', () => {
        it('should return a css hex color', () => {
            const result = util.randomHexColor();
            assert.ok(/^#[0-9A-Fa-f]{3,6}/.test(result));
        });
    });
});
