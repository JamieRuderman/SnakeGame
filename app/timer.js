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
        longest = 0,
        shortest = Infinity,
        paused = false;

    self.init = function() {
      app.renderer.draw();
      app.display.update();
    };

    self.loop = function(time) {
      var elapsed = time - interval;

      // frame
      interval = time;
      self.frame(elapsed);

      if (!paused) {
        setTimeout(function() {
          requestAnimationFrame(self.loop);
        }, frameRate);
      }
    };

    self.start = function() {
      paused = false;
      requestAnimationFrame(self.loop);
      self.ready = false;
    };

    self.stop = function() {
      counter = 0,
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
    };

    self.reset = function() {
      self.stop();
      frameRate = 1000 / app.state.fps;
      self.ready = true;
    };

    self.frame = function(elapsed) {

      // track fps
      if (counter > 2) {
        longest = Math.max(longest, elapsed);
        shortest = Math.min(shortest, elapsed);
      }

      self.fps = {
        cur: Math.round((1000 / elapsed) * 100) / 100,
        min: Math.round((1000 / longest) * 100) / 100,
        max: Math.round((1000 / shortest) * 100) / 100
      };

      counter++;

      if (frameRate > 40) {
        // audio can't render higher frame rates
        app.audio.step();
      }

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

      // lengthen the player every second
      if (elapsed > 10000) {
        // app.player.length += 10;
        // app.controller.addPoint();
      }

      app.renderer.draw();
      app.display.update();

    };

    self.init();

    return self;
  };

})(SnakeGame);