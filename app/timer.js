var SnakeGame = SnakeGame || {};

(function(app){

  app.Timer = function() {
    var self = {},
        frameRate = 1000 / app.config.fps,
        startTime = new Date().getTime(),
        checkTime = startTime,
        counter = 0,
        timer;

    self.init = function() {
      self.start();
    };

    self.frame = function() {
      self.checkTime();
      app.renderer.draw();
    };

    self.start = function() {
      timer = setInterval(self.frame, frameRate);
    };

    self.stop = function() {
      clearInterval(timer);
      timer = null;
    };

    self.pause = function() {
      if (timer) {
        self.stop();
      } else {
        self.start();
      }
    };

    self.reset = function() {
      self.stop();
      counter = 0,
      self.start();
    };

    self.checkTime = function() {
      var now = new Date().getTime(),
          elapsed = now - checkTime;

      counter++;

      // advance frame
      if (counter % app.config.fpm === 0) {
        app.controller.move();
      }

      // rotate every frame
      if (counter % 1 === 0) {
        // app.renderer.rotate(1);
      }

      // every second
      if (counter % app.config.fps === 0) {
        // app.controller.addPoint();
      }

      // lengthen the snake every second
      if (elapsed > 3000) {
        // app.snake.length += 10;
        // app.controller.addPoint();
        checkTime = now;
      }

    };

    self.init();

    return self;
  };

})(SnakeGame);
