var SnakeGame = SnakeGame || {};

(function(app){

  app.Timer = function() {
    var self = {
          ready: true,
          fps: null
        },
        frameRate = 1000 / app.state.fps,
        interval = 0,
        counter = 0,
        paused = false;

    self.init = function() {
      app.renderer.draw();
      app.display.update();
    };

    self.frame = function(time) {
      var elapsed = time - interval;

      if (frameRate > 40) {
        // audio can't render higher frame rates
        app.audio.step();
      }

      // animation loop
      if (elapsed > frameRate) {
        interval = time;
        self.checkTime(elapsed);
        app.renderer.draw();
        app.display.update();
      }

      // console.log('frame', time, elapsed, interval, frameRate);

      if (!paused) {
        requestAnimationFrame(self.frame);
      }
    };

    self.start = function() {
      paused = false;
      console.log('start');
      requestAnimationFrame(self.frame);
      self.ready = false;
    };

    self.stop = function() {
      paused = true;
    };

    self.pause = function() {
      if (paused) {
        self.start();
      } else {
        self.stop();
      }
    };

    self.increase = function() {
      frameRate -= (1000 / app.state.fps) / app.state.fps * app.state.fpsToIncrease;
      self.stop();
      self.start();
    };

    self.reset = function() {
      self.stop();
      counter = 0,
      frameRate = 1000 / app.state.fps;
      self.ready = true;
    };

    self.checkTime = function(elapsed) {
      // track fps
      self.fps = Math.round(100000 / (elapsed)) / 100;

      counter++;

      // advance frame
      if (counter % app.state.fpm === 0) {
        app.controller.move();
      }

      // rotate every frame
      if (counter % 1 === 0) {
        // app.renderer.rotate(1);
      }

      // every second
      if (counter % app.state.fps === 0) {
        // app.controller.addPoint();
      }

      // lengthen the snake every second
      // if (elapsed > 10000) {
        // app.snake.length += 10;
        // app.controller.addPoint();
        // checkTime = now;
      // }

    };

    self.init();

    return self;
  };

})(SnakeGame);