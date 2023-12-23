const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 22: Part 1', () => {
  it('Should calculate how many bricks can disintegrate', () => {
    expect(part1(`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`)).to.equal(5);
  });
});
describe('Day 22: Part 2', () => {
  it('Should calculate how many bricks would disintegrate in chain reaction', () => {
    expect(part2(`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`)).to.equal(7);
  });
});
