var SnakeGame = SnakeGame || {};

(function(app){

  app.state = {
    fps: 8, // frames per second
    fpm: 1, // frames per move
    direction: 'right',
    grow: 10,
    scale: 10,
    length: 10,
    score: 0,
    pointValue: 10,
    pointsToIncreaseSpeed: 5,
    fpsToIncrease: 1.5, // multiplier
    stageSize: [40, 40],
    set: function(options) {
      for (var key in options) {
        this[key] = options[key];
      }
    }
  };


})(SnakeGame);
