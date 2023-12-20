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

  let zeros = 0;
  let ones = 0;

  for (let i = 0; i < 1000; i++) {
    let queue = [['broadcaster', 'button', 0]];

    while (queue.length) {
      let [to, from, signal] = queue.shift();
      //     console.log(`${from} -- ${signal} --> ${to}`);
      if (signal == 1) {
        ones++;
      } else {
        zeros++;
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

  return zeros * ones;
}
