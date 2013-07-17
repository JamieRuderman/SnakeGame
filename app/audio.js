var SnakeGame = SnakeGame || {};

(function(app){

  app.audio = (function() {

    var self = {},
        file = {};

    self.init = function() {
      $('audio').each(function(index, el) {
        file[el.id] = el;
        if (app.state.volume[el.id]) {
          file[el.id].volume = app.state.volume[el.id];
        }
      });
    };

    self.start = function() {
      file.music.play();
    };

    self.pause = function() {
      if (file.music.paused) {
        file.music.play();
      }
      else {
        file.music.pause();
      }
    };

    self.play = function(sound) {
      file[sound].currentTime = 0;
      file[sound].play();
    };

    self.gameover = function() {
      file.gameover.play();
      file.music.pause();
    };

    self.reset = function() {
      file.music.currentTime = 0;
    };

    return self;

  })();

})(SnakeGame);
