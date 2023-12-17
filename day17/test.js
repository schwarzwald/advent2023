const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 17: Part 1', () => {
  it('Should find the path with the least amount of heatloss', () => {
    expect(part1(`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`)).to.equal(102);
  });
});
describe('Day 17: Part 2', () => {
  it('Should find the path with the least amount of heatloss driving the ultra crucible', () => {
    expect(part2(`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`)).to.equal(94);
  });
});
