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
    self.path = function(position) {
      context.globalAlpha = 0.1;
      context.fillStyle = color.points;
      fillBlock(position, [1,1]);
      context.globalAlpha = 1;
    };

    self.draw = function() {
      self.clear();
      // dev
      app.bots.collection(function(bot) {
        bot.eachPath(function(position) {
          self.path(position);
        });
      });
      // main
      app.grid.each(function(type, position) {
        self[type](position);
      });
    };

    self.players = function(position) {
      context.fillStyle = color.players;
      context.strokeStyle = color.background;
      fillBlock(position, [1,1]);
    };

    self.points = function(position) {
      // var style = (app.state.scale < 6) ? fillBlock : circle;
      context.fillStyle = color.points;
      context.strokeStyle = color.points;
      fillBlock(position, [1,1]);
    };

    self.obstacles = function(position) {
      context.fillStyle = color.background;
      context.strokeStyle = '#88' + color.obstacles;
      strokeBlock(position, [1,1]);
      // var counter = 256, hex;
      // app.obstacles.each(function(position, collectionIndex) {
      //   hexR = (256 - (collectionIndex + 1) * 16).toString(16);
      //   context.strokeStyle = '#'+ hexR + color.obstacles;
      //   strokeBlock(position, app.obstacles.size);
      // });`
    };

    self.bots = function(position) {
      context.fillStyle = color.bots;
      context.strokeStyle = color.background;
      fillBlock(position, [1,1]);
    };

    self.borders = function(position) {
      context.fillStyle = color.background;
      context.strokeStyle = color.borders;
      strokeBlock(position, [1,1]);
      // context.font = '9pt Inconsolata';
      // context.fillStyle = color.players;
      // context.fillText(position[0] + '-' + position[1], scale(position[0]), scale(position[1]) + 12);
    };

    self.wall = function(position) {
      context.fillStyle = color.borders;
      context.strokeStyle = color.borders;
      strokeBlock(position, [1,1]);
    };

    self.clear = function() {
      context.fillStyle = color.background;
      context.strokeStyle = color.borders;
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

})(Snake || {});
