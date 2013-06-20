var SnakeGame = SnakeGame || {};

(function(app){

  app.Renderer = function() {
    var self = {},
        color = app.state.color,
        stage = app.stage,
        points = app.points,
        context = stage.context,
        player = app.player;

    self.init = function() {
      self.draw();
      context.lineJoin = 'miter';
      context.lineWidth = 1;
    };

    self.draw = function() {
      self.clear();
      self.obstacles();
      self.bots();
      self.player();
      self.points();
      self.border();
    };

    self.player = function() {
      context.fillStyle = color.player;
      context.strokeStyle = color.background;
      player.each(function(part) {
        fillBlock(part, player.size);
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

    self.bots = function() {
      context.fillStyle = color.bots;
      app.bots.each(function(position) {
        context.strokeStyle = color.background;
        fillBlock(position, app.bots.size);
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
      if (app.border) {
        app.border.each(function(position) {
          console.log(position.toString());
          strokeBlock(position, app.border.size);
        });
      }
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

    /* Private -------------- */

    function fillBlock(position, size) {
      context.fillRect(
        scale(position[0]),
        scale(position[1]),
        scale(size[0]) - 1,
        scale(size[1]) - 1
      );
    }

    function strokeBlock(position, size) {
      context.strokeRect(
        scale(position[0]) - 0.5,
        scale(position[1]) - 0.5,
        scale(size[0]),
        scale(size[1])
      );
    }

    function circle(position, size) {
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
    }

    function scale(size) {
      return Math.round(size * app.state.scale);
    }

    self.init();

    return self;
  };

})(SnakeGame);
