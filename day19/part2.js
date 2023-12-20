function range(r1, r2) {
  return r1 > r2 ? [] : [r1, r2];
}

function split([r1, r2], comparison, value) {
  if (comparison == '>') {
    return [range(Math.max(value + 1, r1), r2), range(r1, Math.min(r2, value))];
  } else {
    return [range(r1, Math.min(value - 1, r2)), range(Math.max(value, r1), r2)];
  }
}

module.exports = input => {
  let [workflows, _] = input.split(/\r?\n\r?\n/)
    .map(g => g.split(/\r?\n/));

  workflows = workflows.map(w => w.match(/(\w+)\{(.*)\}/))
    .map(([_, id, w]) => [id, w.split(',')])
    .reduce((map, [id, w]) => map.set(id, w), new Map());

  const eval = (id, ranges) => {
    if (id == 'A') {
      return [ranges];
    }
    if (id == 'R') {
      return [[], [], [], []];
    }

    let rules = workflows.get(id);
    let results = [];

    for (let rule of rules) {
      if (rule.indexOf(':') >= 0) {
        let [condition, result] = rule.split(':');
        let [_, rating, comparison, value] = condition.match(/(\w)([<>])(\d+)/);
        let index = 'xmas'.indexOf(rating);
        let testRange = ranges[index];
        value = Number(value);

        let [positive, negative] = split(testRange, comparison, value);

        if (positive.length) {
          let nranges = [...ranges];
          nranges.splice(index, 1, positive);
          results.push(...eval(result, nranges));
        }

        if (negative.length == 0) {
          break;
        }

        ranges = [...ranges];
        ranges.splice(index, 1, negative)
      }
      else {
        results.push(...eval(rule, ranges));
      }
    }

    return results.filter(r => r.some(p => p.length));
  }

  return eval('in', [[1, 4000], [1, 4000], [1, 4000], [1, 4000]])
    .map(r => r.reduce((p, [r1, r2]) => p * (r2 - r1 + 1), 1))
    .reduce((a, b) => a + b);
}