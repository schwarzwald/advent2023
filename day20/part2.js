function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

module.exports = input => {
  let modules = input.split(/\r?\n/)
    .map(r => r.match(/([%&]?)(\w+) -> ([\w\s,]+)/))
    .map(([, type, id, outputs]) => [id, type, outputs.split(', '), {}])
    .reduce((map, m) => map.set(m[0], m), new Map());

  for (let id of modules.keys()) {
    let [, type, outputs, object] = modules.get(id);

    if (type == '%') {
      object.state = 0;
    }

    for (let output of outputs) {
      if (!modules.has(output)) {
        continue;
      }

      let [, type2, , object2] = modules.get(output);
      if (type2 == '&') {
        if (!object2.inputs) {
          object2.inputs = new Map();
        }
        object2.inputs.set(id, 0);
      }
    }
  }

  let result = 1;
  // specific for my input
  // the whole machine consists of four independent "shift registers"
  // we find period of each one separately and then combine the result
  let pairs = [['zb', 'nl'], ['xd', 'dq'], ['sm', 'qt'], ['kr', 'vt']];

  for (let [input, output] of pairs) {
    let period = null;
    for (let i = 1; !period; i++) {
      let queue = [[input, 'broadcaster', 0]];

      while (queue.length) {
        let [to, from, signal] = queue.shift();
        //     console.log(`${from} -- ${signal} --> ${to}`);
        if (from == output && signal == 0) {
          period = i;
        }

        if (!modules.has(to)) {
          continue;
        }
        let [id, type, outputs, object] = modules.get(to);
        if (id == 'broadcaster') {
          for (let output of outputs) {
            queue.push([output, id, signal]);
          }
        } else if (type == '%') {
          if (signal === 0) {
            object.state = object.state ? 0 : 1;
            for (let output of outputs) {
              queue.push([output, id, object.state]);
            }
          }
        } else if (type == '&') {
          object.inputs.set(from, signal);
          let all = ([...object.inputs.values()].every(v => v == 1));
          for (let output of outputs) {
            queue.push([output, id, all ? 0 : 1]);
          }
        }
      }

    }

    result = lcm(result, period);
  }

  return result;
}
