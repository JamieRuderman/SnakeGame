var SnakeGame = SnakeGame || {};

(function(app){

  app.state = {

    // defaults
    direction: 'right',
    fpm: 1, // frames per move
    fps: 8, // frames per second
    fpsToIncrease: 1.5, // multiplier
    grow: 10,
    length: 10,
    pointsToIncreaseSpeed: 5,
    pointValue: 10,
    scale: 10,
    score: 0,
    stageSize: [40, 40],

    // presets
    preset: {
      small: {
        fps: 4,
        length: 5,
        scale: 20,
        stageSize: [20, 20]
      },
      medium: {
        fps: 8,
        grow: 20,
        length: 10,
        scale: 10,
        stageSize: [40, 40]
      },
      large: {
        fps: 30,
        grow: 40,
        length: 30,
        scale: 5,
        stageSize: [170, 170]
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
