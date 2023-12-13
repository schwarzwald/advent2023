const expect = require('expect.js');
const part1 = require('./part1');

describe('Day 12: Part 1', () => {
  it('Should sum number of possible arrangments', () => {
    expect(part1(`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`)).to.equal(21);
  });
});
describe('Day 12: Part 2', () => {

});
