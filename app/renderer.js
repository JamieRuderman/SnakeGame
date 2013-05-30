var SnakeGame = SnakeGame || {};

(function(app){

  app.Renderer = function() {
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
      self.clear();
      self.snake();
      self.points();
      if (app.obstacle) self.obstacle();
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
        circle(point, points.size);
      });
    };

    self.obstacle = function() {
      context.fillStyle = '#ffff00';
      context.strokeStyle = '#000';
      app.obstacle.each(function(part) {
        block(part, app.obstacle.size);
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
        app.stage.size[0] / 2 * app.state.scale,
        app.stage.size[1] / 2 * app.state.scale
      );
      app.stage.context.rotate(deg * Math.PI / 180);
      app.stage.context.translate(
        -app.stage.size[0] / 2 * app.state.scale,
        -app.stage.size[1] / 2 * app.state.scale
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

    circle = function(position, size) {
      var radius = scale(size[0]) / 2;
      context.beginPath();
      context.arc(
        scale(position[0]) + radius,
        scale(position[1]) + radius,
        radius,
        0, Math.PI * 2, true
      );
      context.closePath();
      context.fill();
      context.stroke();
    };

    scale = function(size) {
      return Math.round(size * app.state.scale);
    };

    self.init();

    return self;
  };

})(SnakeGame);
