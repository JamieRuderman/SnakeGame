var SnakeGame = SnakeGame || {};

(function(app){

  app.state = {

    // defaults
    defaults: {
      direction: 'none',
      fpm: 1, // frames per move
      fps: 8, // frames per second
      fpsToIncrease: 0.5,
      fpsDisplay: false,
      grow: 5,
      length: 10,
      pointsToIncreaseSpeed: 5,
      pointValue: 10,
      scale: 10,
      score: 0,
      obstacles: 5,
      bots: 0,
      obstaclesLength: 15,
      stageSize: [40, 40],
      volume: {
        music: 0.05,
        step: 0.05,
        score: 0.3,
        gameover: 0.3
      },
      color: {
        border: '#003300',
        background: '#000000',
        obstacles: '0000', // R is dynamic
        points: '#00ffff',
        player: '#00ff00'
      }
    },

    // presets
    preset: {
      small: {
        fps: 4,
        grow: 5,
        length: 5,
        obstacles: 0,
        scale: 20,
        stageSize: [20, 20]
      },
      medium: {
        fps: 8,
        grow: 10,
        length: 10,
        obstacles: 2,
        bots: 1,
        scale: 10,
        stageSize: [50, 50],
        color: {
          border: '#003300',
          background: '#ff0000',
          obstacles: 'ffff', // R is dynamic
          points: '#00ffff',
          player: '#00ff00'
        }
      },
      large: {
        fps: 30,
        grow: 50,
        length: 30,
        obstacles: 10,
        obstaclesLength: 40,
        scale: 5,
        stageSize: [170, 170]
      }
    },

    init: function() {
      this.enable(this.defaults);
    },

    set: function(preset) {
      // re-enable defaults to remove any existing presets
      this.enable(this.defaults);
      this.enable(this.preset[preset]);
    },

    enable: function(options) {
      for (var key in options) {
        this[key] = options[key];
      }
    },

    toggle: function(setting) {
      this[setting] = this[setting] ? false : true;
    }

  };

})(SnakeGame);
