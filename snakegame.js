

var SnakeGame = {};

(function(app){

  var config = {
    scale: 10,
    fps: 20,
    direction: 'down'
    // speed: 1
  };

  app.start = function() {
    // start snake game
    $(document).ready(function() {
      app.snake = new Snake();
      app.stage = new Stage();
      app.renderer = new Renderer();
      app.controller = new Controller();
      app.timer = new Timer();
    });
  };

  var Stage = function() {

    var self = {
      // width, height in blocks
      size: [60, 80],
      name: 'stage',
      el: $('<canvas />')
    };

    var body = $('body'),
        scale = config.scale;

    self.init = function() {
      body.append(self.el);
      self.el.addClass('stage');
      self.el.attr({
        width: (self.size[0] * scale) + 'px',
        height: (self.size[1] * scale) + 'px'
      });
      self.context = self.el[0].getContext('2d');
    };

    self.init();

    return self;
  };

  var Snake = function() {
    var self = {
      size: [1, 1],
      position: [0, 0],
      segments: [],
      length: 10,
      name: 'snake'
    };

    self.init = function() {
      self.addSegment(self.position);
    };

    self.advance = function() {
      self.addSegment();
      if (self.segments.length > self.length) {
        self.segments.pop();
      }
    };

    self.addSegment = function() {
      self.segments.unshift([self.position[0], self.position[1]]);
    };

    self.eachSegment = function(callback) {
      for (var i = 0, len = self.segments.length; i < len; i++) {
        callback(self.segments[i]);
      }
    };

    self.init();

    return self;
  };

  var Controller = function() {
    var self = {},
        stage = app.stage,
        snake = app.snake,
        direction = config.direction;

    self.init = function() {
      $(window).on('keydown', self.changeDirection);
      self.center(snake);
    };

    self.move = function() {
      switch (direction) {
        case 'left':
          snake.position[0] -= 1;
          break;
        case 'right':
          snake.position[0] += 1;
          break;
        case 'up':
          snake.position[1] -= 1;
          break;
        case 'down':
          snake.position[1] += 1;
          break;
      }

      self.checkBorder();
      snake.advance();
      app.renderer.draw();
    };

    self.center = function(sprite) {
      sprite.position = [
        stage.size[0]/2,
        stage.size[1]/2
      ];
    };

    self.changeDirection = function(event) {
      switch (event.keyCode) {
        case 37: // left
        case 65: // a
          direction = 'left';
          break;
        case 39: // right
        case 68: // d
          direction = 'right';
          break;
        case 38: // up
        case 87: // w
          direction = 'up';
          break;
        case 40: // down
        case 83: // s
          direction = 'down';
          break;
        case 32: // space
          direction = 'none';
          break;
        case 27: // esc
          app.timer.pause();
          break;
      }
      // console.log('key', event.keyCode);
    };

    self.checkBorder = function() {
      // left / right
      if (snake.position[0] < 0) {
        snake.position[0] = stage.size[0] -1;
      } else if (snake.position[0] >= stage.size[0]) {
        snake.position[0] = 0;
      }

      // up / down
      if (snake.position[1] < 0) {
        snake.position[1] = stage.size[1] -1;
      } else if (snake.position[1] >= stage.size[1]) {
        snake.position[1] = 0;
      }
    };

    self.init();

    return self;
  };

  var Timer = function() {
    var self = {},
        frameRate = 1000 / config.fps,
        startTime = new Date().getTime(),
        checkTime = startTime,
        timer;

    self.init = function() {
      self.start();
    };

    self.frame = function() {
      self.checkTime();
      app.controller.move();
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

    self.checkTime = function() {
      var now = new Date().getTime(),
          elapsed = now - checkTime;

      // lengthen the snake every 5 seconds
      if (elapsed > 5000) {
        app.snake.length += 20;
        checkTime = now;
        console.log('longer', app.snake.length);
      }

    };

    self.init();

    return self;
  };

  var Renderer = function() {
    var self = {},
        stage = app.stage,
        context = stage.context,
        snake = app.snake;

    self.init = function() {
      self.draw();
      context.strokeStyle = '#000';
      context.lineJoin = 'miter';
      context.lineWidth = 1;
    };

    self.draw = function() {
      // context.save();
      self.clear();
      self.snake();
      // context.restore();
    };

    self.snake = function() {
      context.fillStyle = 'red';
      snake.eachSegment(function(part) {
        context.fillRect(
          scale(part[0]),
          scale(part[1]),
          scale(snake.size[0]),
          scale(snake.size[1])
        );
        context.strokeRect(
          scale(part[0]) + 0.5,
          scale(part[1]) + 0.5,
          scale(snake.size[0]) - 1,
          scale(snake.size[1]) - 1
        );
      });
    };

    self.clear = function() {
      context.fillStyle = 'black';
      context.fillRect(0, 0,
        scale(stage.size[0]),
        scale(stage.size[1])
      );
    };

    // private

    scale = function(size) {
      return Math.round(size * config.scale);
    };

    self.init();

    return self;

  };

})(SnakeGame);
