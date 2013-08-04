var Snake = Snake || {};

(function(app){

  app.audio = (function() {

    var self = {},
        file = {},
        handle = {};

    self.init = function() {
      app.events.register(handle);
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

    handle.ready = function() {
      self.start();
    };

    handle.reset = function() {
      file.music.currentTime = 0;
      self.start();
    };

    handle.score = function() {
      self.play('score');
    };

    return self;

  })();

})(Snake);
