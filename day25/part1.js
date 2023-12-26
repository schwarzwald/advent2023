module.exports = input => {
  let nodes = input.split(/\r?\n/)
    .map(r => r.split(': '))
    .map(([s, d]) => [s, d.split(' ')]);

  let map = new Map();
  for (let [source, destinations] of nodes) {
    let targets = map.get(source) || new Set();
    map.set(source, targets);

    for (let destination of destinations) {
      targets.add(destination);
      let sources = map.get(destination) || new Set();
      map.set(destination, sources);
      sources.add(source);
    }
  }

  map.get('rgv').delete('jct');
  map.get('jct').delete('rgv');
  map.get('zhg').delete('fmr');
  map.get('fmr').delete('zhg');
  map.get('krf').delete('crg');
  map.get('crg').delete('krf');

  let starts = ['rgv', 'jct'];
  let sizes = [];

  for (let key of starts) {
    let queue = [key];
    let visited = new Set();
    while (queue.length) {
      let current = queue.shift();

      if (visited.has(current)) {
        continue;
      }

      visited.add(current);

      queue.push(...map.get(current));
    }
    sizes.push(visited.size);
  }

  return sizes[0] * sizes[1];
}
