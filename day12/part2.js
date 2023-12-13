const cache = new Map();

function validate(data, groups, j) {
  let group = groups[0];

  for (let s = 0; s < j; s++) {
    if (data[s] == '#') {
      return false;
    }
  }

  for (let f = 0; f < group; f++) {
    if (data[j + f] == '.') {
      return false;
    }
  }

  if (j + group < data.length && data[j + group] == '#') {
    return false;
  }

  if (groups.length == 1) {
    for (let e = j + group + 1; e < data.length; e++) {
      if (data[e] == '#') {
        return false;
      }
    }
  }
  return true;
}

function solve(data, groups) {
  if (!groups.length) {
    return 1;
  }

  let group = groups[0];
  let count = 0;

  if (data.length < group) {
    return 0;
  }

  let key = `${data.join('')}#${groups.join(',')}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  for (let j = 0; j <= data.length - group; j++) {
    if (validate(data, groups, j)) {
      count += solve(data.slice(j + group + 1), groups.slice(1));
    }
  }

  cache.set(key, count);
  return count;
}

module.exports = input =>
  input.split(/\r?\n/)
    .map(r => r.split(' '))
    .map(([data, hints]) => [
      `${data}?${data}?${data}?${data}?${data}`.split(''),
      `${hints},${hints},${hints},${hints},${hints}`.split(',').map(Number)])
    .map(([data, hints]) => solve(data, hints))
    .reduce((a, b) => a + b);