var SnakeGame = SnakeGame || {};

(function(app){

  app.Audio = function() {

    var self = {},
        music;

    self.init = function() {
      music = $('audio.music')[0];
      music.volume = 0.1;
      score = $('audio.score')[0];
      score.volume = 0.1;
    };

    self.start = function() {
      music.play();
    };

    self.score = function() {
      score.currentTime = 0;
      score.play();
    };

    self.gameover = function() {
      music.pause();
    };

    self.reset = function() {
      music.currentTime = 0;
    };

    self.init();

    return self;

  };

})(SnakeGame);
