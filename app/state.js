var SnakeGame = SnakeGame || {};

(function(app){

  app.state = {

    // defaults
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

    // presets
    preset: {
      small: {
        stageSize: [20, 20],
        scale: 20,
        length: 5,
        fps: 4
      },
      medium: {
        stageSize: [40, 40],
        scale: 10,
        length: 10,
        fps: 8
      },
      large: {
        stageSize: [170, 170],
        scale: 5,
        length: 30,
        grow: 30,
        fps: 24
      }
    },

    set: function(preset) {
      this.enable(this.preset[preset]);
    },

    enable: function(options) {
      for (var key in options) {
        this[key] = options[key];
      }
    }

  };

})(SnakeGame);
