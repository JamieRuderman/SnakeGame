var SnakeGame = SnakeGame || {};

(function(app){

  app.Renderer = function() {
    var self = {},
        color = app.state.color,
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
      self.obstacles();
      self.snake();
      self.points();
      self.border();
    };

    self.snake = function() {
      context.fillStyle = color.player;
      context.strokeStyle = color.background;
      snake.each(function(part) {
        fillBlock(part, snake.size);
      });
    };

    self.points = function() {
      var style = (app.state.scale < 6) ? fillBlock : circle;
      context.fillStyle = color.points;
      points.each(function(point) {
        style(point, points.size);
      });
    };

    self.obstacles = function() {
      var counter = 256, hex;

      context.fillStyle = color.background;
      app.obstacles.each(function(position, collectionIndex) {
        hexR = (256 - (collectionIndex + 1) * 16).toString(16);
        context.strokeStyle = '#'+ hexR + color.obstacles;
        strokeBlock(position, app.obstacles.size);
      });
    };

    self.clear = function() {
      context.fillStyle = color.background;
      context.fillRect(0, 0,
        scale(stage.size[0]),
        scale(stage.size[1])
      );
    };

    self.border = function() {
      context.strokeStyle = color.border;
      context.strokeRect(0.5, 0.5,
        scale(stage.size[0]) - 1,
        scale(stage.size[1]) - 1
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

    fillBlock = function(position, size) {
      context.fillRect(
        scale(position[0]),
        scale(position[1]),
        scale(size[0]) - 1,
        scale(size[1]) - 1
      );
    };

    strokeBlock = function(position, size) {
      context.strokeRect(
        scale(position[0]) - 0.5,
        scale(position[1]) - 0.5,
        scale(size[0]),
        scale(size[1])
      );
    };

    circle = function(position, size) {
      var radius = scale(size[0]) / 2;
      context.beginPath();
      context.arc(
        scale(position[0]) + radius,
        scale(position[1]) + radius,
        radius - 1,
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
