const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 10: Part 1', () => {
  it('Should count the max distance from the starting position', () => {
    expect(part1(`.....
.S-7.
.|.|.
.L-J.
.....`)).to.equal(4);

    expect(part1(`..F7.
.FJ|.
SJ.L7
|F--J
LJ...`)).to.equal(8);
  });
});
describe('Day 10: Part 2', () => {
  it('Should count the number of tiles inside the loop #1', () => {
    expect(part2(`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`)).to.equal(4);
  });

  it('Should count the number of tiles inside the loop #2', () => {
    expect(part2(`..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`)).to.equal(4);
  });

  it('Should count the number of tiles inside the loop #3', () => {
    expect(part2(`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`)).to.equal(8);
  });

  it('Should count the number of tiles inside the loop #4', () => {
    expect(part2(`FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`)).to.equal(10);
  });
});
