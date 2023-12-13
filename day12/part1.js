function generate(data, hints) {
  return partition(
    data.length - hints.reduce((a, b) => a + b) - (hints.length - 1),
    hints.length + 1)
    .filter(p => validate(data, p, hints)).length;
}

function validate(data, spaces, hints) {
  let x = 0;
  for (let i = 0; i < spaces.length; i++) {
    let space = spaces[i];

    let size = space;
    if (i != 0 && i != spaces.length - 1) {
      size++;
    }

    for (let j = 0; j < size; j++) {
      if (data[x] == '#') {
        return false;
      }
      x++;
    }

    if (i != spaces.length - 1) {
      for (let j = 0; j < hints[i]; j++) {
        if (data[x] == '.') {
          return false;
        }
        x++;
      }
    }
  }

  return true;
}

function partition(sum, parts) {
  let partitions = [];
  if (parts == 1) {
    return [[sum]];
  }
  for (let i = 0; i <= sum; i++) {
    for (let part of partition(sum - i, parts - 1)) {
      partitions.push([i, ...part]);
    }
  }
  return partitions;
}

module.exports = input =>
  input.split(/\r?\n/)
    .map(r => r.split(' '))
    .map(([data, hints]) => [
      data.split(''),
      hints.split(',')
        .map(Number)])
    .map(([data, hints]) => generate(data, hints))
    .reduce((a, b) => a + b);