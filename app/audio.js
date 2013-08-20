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
      if (app.state.sound.music) {
        file.music.play();
      }
    };

    self.play = function(sound) {
      if (app.state.sound.effects) {
        file[sound].currentTime = 0;
        file[sound].play();
      }
    };

    self.stop = function() {
      if (app.state.sound.music) {
        file.music.pause();
      }
    };

    /* Event handling ------ */

    handle.pause = function() {
      if (app.state.paused) {
        self.start();
      }
      else {
        self.stop();
      }
    };

    handle.gameover = function() {
      self.play('gameover');
      self.stop();
    };

    handle.ready = function() {
      self.start();
    };

    handle.reset = function() {
      file.music.currentTime = 0;
      self.start();
    };

    handle.death = function() {
      self.play('kill');
    };

    handle.score = function() {
      self.play('score');
    };

    handle.steal = function() {
      self.play('steal');
    };

    return self;

  })();

})(Snake);
