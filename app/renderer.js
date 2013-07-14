(function(app){

  app.Renderer = function() {
    var self = {},
        color = app.state.color,
        stage = app.stage,
        context = stage.context;

    self.init = function() {
      self.draw();
      context.lineJoin = 'miter';
      context.lineWidth = 1;
    };

    // dev
    self.path = function() {
      var path = app.ai.find([1,1], [5,5]);

      for (var i = path.length; i--;) {
        hexR = (256 - (path[i][2] + 1) * 16).toString(16);
        context.fillStyle = '#' + hexR + '0000';
        fillBlock(path[i], [1, 1]);
      }

    };

    self.draw = function() {
      self.clear();
      app.grid.each(function(type, position) {
        self[type](position);
      });
    };

    self.player = function(position) {
      context.fillStyle = color.player;
      context.strokeStyle = color.background;
      fillBlock(position, app.player.size);
    };

    self.points = function(position) {
      var style = (app.state.scale < 6) ? fillBlock : circle;
      context.fillStyle = color.points;
      style(position, app.points.size);
    };

    self.obstacles = function(position) {
      context.fillStyle = color.background;
      strokeBlock(position, app.obstacles.size);
      // var counter = 256, hex;
      // app.obstacles.each(function(position, collectionIndex) {
      //   hexR = (256 - (collectionIndex + 1) * 16).toString(16);
      //   context.strokeStyle = '#'+ hexR + color.obstacles;
      //   strokeBlock(position, app.obstacles.size);
      // });
    };

    self.bots = function(position) {
      context.fillStyle = color.bots;
      context.strokeStyle = color.background;
      fillBlock(position, app.bots.size);
    };

    self.border = function(position) {
      context.strokeStyle = color.border;
      strokeBlock(position, app.border.size);
    };

    self.clear = function() {
      context.fillStyle = color.background;
      context.fillRect(0, 0,
        scale(stage.size[0]),
        scale(stage.size[1])
      );
      // outline stage
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

})(SnakeGame || {});
