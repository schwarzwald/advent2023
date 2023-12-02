module.exports = input =>
  input.split(/\r?\n/)
    .map(r => [
      +r.match(/Game (\d+)/)[1],
      r.split(': ')[1].split('; ')
    ])
    .filter(([, draws]) => {
      for (let draw of draws) {
        let red = 0;
        let green = 0;
        let blue = 0;

        for (let ball of draw.split(', ')) {
          let [count, color] = ball.split(' ');
          if (color == 'red') {
            red = +count;
          } else if (color == 'green') {
            green = +count;
          } else {
            blue = +count;
          }
        }

        if (red > 12 || green > 13 || blue > 14) {
          return false;
        }
      }
      return true;
    })
    .reduce((sum, [id]) => sum + id, 0);