function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function steps(tree, position, instructions) {
  let ip = 0;
  let visited = new Map();
  while (true) {
    if (position.endsWith('Z')) {
      let id = `${position}#${ip % instructions.length}`;
      if (visited.has(id)) {
        return [visited.get(id), ip - visited.get(id)];
      }
      visited.set(id, ip);
    }
    position = tree.get(position)[instructions[ip % instructions.length] == "L" ? 0 : 1];
    ip++;
  }
}
module.exports = (input) => {
  let rows = input.split(/\r?\n/);
  let instructions = [...rows[0]];

  let tree = rows
    .slice(2)
    .map((r) => /([\w]+) = \(([\w]+), ([\w]+)\)/.exec(r))
    .map(([, a, l, r]) => [a, l, r])
    .reduce((map, [a, l, r]) => map.set(a, [l, r]), new Map());

  let positions = [...tree.keys()].filter((a) => a.endsWith("A"));
  return positions.map(p => steps(tree, p, instructions)).map(a => a[0]).reduce((a, b) => lcm(a, b), 1);
};
