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
        app.stage.size[0] / 2 * app.config.scale,
        app.stage.size[1] / 2 * app.config.scale
      );
      app.stage.context.rotate(deg * Math.PI / 180);
      app.stage.context.translate(
        -app.stage.size[0] / 2 * app.config.scale,
        -app.stage.size[1] / 2 * app.config.scale
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
      return Math.round(size * app.config.scale);
    };

    self.init();

    return self;
  };

})(SnakeGame);
