const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 15: Part 1', () => {
  it('Should calculate sum of hashes', () => {
    expect(part1(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`)).to.equal(1320);
  });
});
describe('Day 15: Part 2', () => {
  it('Should calculate the focusing power of lenses', () => {
    expect(part2(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`)).to.equal(145);
  });
});
