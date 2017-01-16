$(function() {
  var replays = [];

  $.get('/games.txt', function(data) {
    var games = data.split('%');

    games.forEach(function(game, i) {
      replays.push(game.split(/[^-]\n-+/));
    });

    replays.sort(function() { return Math.random() < 0.5; });

    var game = 0;
    var frame = 0;
    var $pre = $('#replay');
    var first = replays[0][0].split('\n')[1];

    setInterval(function() {
      $pre.text(replays[game][frame] + '|\n' + first);

      frame++;

      if(frame == replays[game].length - 1) {
        frame = 0;
        game = (game + 1) % replays.length;
        var lines = replays[game][0].split('\n');

        first = lines[0] || lines[1];
      }

    }, 130);
  });

  var press_start = $('.press-start');
  setInterval(function() {
    press_start.toggleClass('blink');
  }, 600);
});
