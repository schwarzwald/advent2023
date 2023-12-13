function generate(data, hints) {
  let sum = data.length - hints.reduce((a, b) => a + b) - (hints.length - 1);
  let parts = hints.length + 1;
  let valid = 0;

  let generator = partition(sum, parts, parts);
  let value;
  do {
    value = generator.next();
    if (validate(data, value.value, hints)) {
      valid++;
    }
  } while (value.value[0] != sum);

  return valid;
}

function* partition(sum, parts, total, arr) {
  arr = arr || new Array(parts);
  if (parts == 1) {
    arr[total - parts] = sum;
    yield arr;
  } else {
    for (let i = 0; i <= sum; i++) {
      arr[total - parts] = i;
      yield* partition(sum - i, parts - 1, total, arr)
    }
    return;
  }
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

module.exports = input =>
  input.split(/\r?\n/)
    .map(r => r.split(' '))
    .map(([data, hints]) => [
      data.split(''),
      hints.split(',')
        .map(Number)])
    .map(([data, hints]) => generate(data, hints))
    .reduce((a, b) => a + b);