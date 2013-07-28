(function(app){

  app.state = {

    // defaults
    defaults: {
      border: false,
      bots: 0,
      direction: 'none',
      fpm: 1, // frames per move
      fps: 8, // frames per second
      fpsDisplay: false,
      fpsToIncrease: 0.5,
      grow: 5,
      length: 10,
      obstacles: 0,
      obstaclesLength: 15,
      pointsToIncreaseSpeed: 5,
      scorePointValue: 10,
      killPointValue: 40,
      scale: 10,
      score: 0,
      stageSize: [40, 40],
      volume: {
        gameover: 0.3,
        kill: 0.3,
        music: 0.05,
        score: 0.3,
        steal: 0.6,
        step: 0.04
      },
      color: {
        border: '#003300',
        background: '#000000',
        obstacles: '0000', // Red is dynamic
        points: '#00ffff',
        player: '#00ff00',
        bots: '#CCCCCC'
      }
    },

    // presets
    preset: {
      small: {
        fps: 4,
        grow: 5,
        length: 5,
        border: true,
        bots: 2,
        scale: 20,
        stageSize: [20, 20]
      },
      medium: {
        fps: 8,
        fpsToIncrease: 1,
        pointsToIncreaseSpeed: 1,
        grow: 10,
        length: 30,
        obstacles: 2,
        obstaclesLength: 25,
        bots: 2,
        scale: 10,
        stageSize: [60, 60],
        color: {
          border: '#003333',
          background: '#ff0000',
          obstacles: '0000', // Red is dynamic
          points: '#00ffff',
          player: '#ff9900',
          bots: '#990000'
        }
      },
      large: {
        fps: 30,
        grow: 50,
        length: 30,
        border: true,
        obstaclesLength: 50,
        bots: 3,
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

})(Snake || {});
