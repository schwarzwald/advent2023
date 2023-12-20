module.exports = input => {
  let [workflows, parts] = input.split(/\r?\n\r?\n/)
    .map(g => g.split(/\r?\n/));

  workflows = workflows.map(w => w.match(/(\w+)\{(.*)\}/))
    .map(([_, id, w]) => [id, w.split(',')])
    .reduce((map, [id, w]) => map.set(id, w), new Map());

  const eval = (id, values) => {
    if (id == 'A') {
      return true;
    }
    if (id == 'R') {
      return false;
    }

    let rules = workflows.get(id);
    for (let rule of rules) {
      if (rule.indexOf(':') >= 0) {
        let [condition, result] = rule.split(':');
        let [_, rating, comparison, value] = condition.match(/(\w)([<>])(\d+)/);
        let testee = values['xmas'.indexOf(rating)];
        value = Number(value);
        if ((comparison == '>' && testee > value)
          || (comparison == '<' && testee < value)) {
          return eval(result, values);
        }
      } else {
        return eval(rule, values);
      }
    }
  }

  parts = parts.map(p => p.slice(1, p.length - 1))
    .map(p => p.split(',').map(r => Number(r.split('=')[1])));

  return parts.filter(p => eval('in', p))
    .map(([x, m, a, s]) => x + m + a + s)
    .reduce((a, b) => a + b);
}