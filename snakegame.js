

var SnakeGame = {};

(function(app){

  var config = {
    scale: 10,
    fps: 40, // frames per second
    fpm: 5, // frames per move
    length: 10,
    direction: 'none',
    grow: 15
  };

  app.start = function() {
    // start snake game
    $(document).ready(function() {
      app.snake = new Snake();
      app.points = new Points();
      app.stage = new Stage();
      app.renderer = new Renderer();
      app.controller = new Controller();
      app.timer = new Timer();
    });
  };

  var Stage = function() {

    var self = {
      // width, height in blocks
      size: [40, 40],
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
      length: config.length
    };

    self.init = function() {
      // self.addSegment(self.position);
    };

    self.advance = function() {
      self.addSegment();
      self.checkLength();
    };

    self.checkLength = function() {
      if (self.segments.length > self.length) {
        self.segments.pop();
        self.checkLength();
      }
    };

    self.addSegment = function() {
      self.segments.unshift(self.position.slice());
    };

    self.each = function(callback) {
      for (var i = 0, len = self.segments.length; i < len; i++) {
        callback(self.segments[i]);
      }
    };

    self.reset = function() {
      app.snake.length = config.length;
      self.segments = [];
    };

    self.init();

    return self;
  };

  var Points = function() {
    var self = {
      points: [],
      size: [1, 1],
      length: config.length
    };

    /*
      @param max array [x max value, y max value]
      @param occupiedCallback function add validation callback
    */
    self.add = function(max, occupiedCallback) {
      var point = [
        Math.round(Math.random() * (max[0] -1)),
        Math.round(Math.random() * (max[1] -1))
      ];

      if (occupiedCallback(point)) {
        console.log('space occupied', point);
        self.add(max, occupiedCallback);
      }
      else {
        console.log('add point', point);
        self.points.push(point);
      }
    };

    self.remove = function(position) {
      self.each(function(point, index) {
        if (point[0] == position[0] && point[1] == position[1]) {
          self.points.splice(index, 1);
        }
      });
    };

    self.each = function(callback) {
      for (var i = 0, len = self.points.length; i < len; i++) {
        if (self.points[i] !== undefined) {
          callback(self.points[i], i);
        }
      }
    };

    return self;
  };

  var Controller = function() {
    var self = {},
        stage = app.stage,
        snake = app.snake,
        points = app.points,
        direction = config.direction;

    self.init = function() {
      $(window).on('keydown', self.changeDirection);
      self.center(snake);
      self.addPoint();
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
      self.checkHit(snake.position);
      snake.advance();
    };

    self.center = function(sprite) {
      sprite.position = [
        stage.size[0] / 2,
        stage.size[1] / 2
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
    };

    self.addPoint = function() {
      if (self.full()) {
        app.timer.stop();
        console.log('GAME OVER');
      }
      else {
        points.add(stage.size, self.occupied);
      }
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

    self.checkHit = function(position) {
      if (self.hit('snake', position)) {
        self.reset();
      }
      if (self.hit('points', position)) {
        snake.length += config.grow;
        points.remove(snake.position);
        // self.addPoint();
        console.log('got it!');
      }
    };

    self.hit = function(typeName, position) {
      var type = app[typeName],
          hit = false;

      type.each(function(item) {
        if (item[0] == position[0] && item[1] == position[1]) {
          hit = true;
        }
      });

      return hit;
    };

    self.occupied = function(position) {
      var types = ['snake', 'points'],
          occupied = false;

      for (var i = types.length - 1; i >= 0; i--) {
        if (self.hit(types[i], position)) {
          occupied = true;
          break;
        }
      }

      return occupied;
    };

    self.full = function() {
      var max = stage.size[0] * stage.size[1],
          total = points.points.length + snake.segments.length;
          console.log('full?', total, max);
      return total >= max;
    };

    self.reset = function() {
      self.center(snake);
      direction = 'none';
      snake.reset();
      app.timer.reset();
    };

    self.init();

    return self;
  };

  var Timer = function() {
    var self = {},
        frameRate = 1000 / config.fps,
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
      if (counter % config.fpm === 0) {
        app.controller.move();
      }

      // rotate every frame
      if (counter % 1 === 0) {
        // app.renderer.rotate(1);
      }

      // every second
      if (counter % config.fps === 0) {
        // app.controller.addPoint();
      }

      // lengthen the snake every second
      if (elapsed > 3000) {
        // app.snake.length += 10;
        app.controller.addPoint();
        checkTime = now;
      }

    };

    self.init();

    return self;
  };

  var Renderer = function() {
    var self = {},
        stage = app.stage,
        points = app.points,
        context = stage.context,
        snake = app.snake;

    self.init = function() {
      self.draw();
      context.lineJoin = 'miter';
      context.lineWidth = 1;
    };

    self.draw = function() {
      // context.save();
      self.clear();
      self.snake();
      self.points();
      // context.restore();
    };

    self.snake = function() {
      context.fillStyle = '#00ff00';
      context.strokeStyle = '#000';
      snake.each(function(part) {
        block(part, snake.size);
      });
    };

    self.points = function() {
      context.fillStyle = '#00ffff';
      points.each(function(point) {
        block(point, points.size);
      });
    };

    self.clear = function() {
      context.fillStyle = 'black';
      context.strokeStyle = 'green';
      context.fillRect(0, 0,
        scale(stage.size[0]),
        scale(stage.size[1])
      );
      context.strokeRect(0, 0,
        scale(stage.size[0]),
        scale(stage.size[1])
      );
    };

    self.rotate = function(deg) {
      app.stage.context.translate(
        app.stage.size[0] / 2 * config.scale,
        app.stage.size[1] / 2 * config.scale
      );
      app.stage.context.rotate(deg * Math.PI / 180);
      app.stage.context.translate(
        -app.stage.size[0] / 2 * config.scale,
        -app.stage.size[1] / 2 * config.scale
      );
    };

    // private

    block = function(position, size) {
      context.fillRect(
        scale(position[0]),
        scale(position[1]),
        scale(size[0]),
        scale(size[1])
      );
      context.strokeRect(
        scale(position[0]) + 0.5,
        scale(position[1]) + 0.5,
        scale(size[0]) - 1,
        scale(size[1]) - 1
      );
    };

    scale = function(size) {
      return Math.round(size * config.scale);
    };

    self.init();

    return self;
  };

})(SnakeGame);
