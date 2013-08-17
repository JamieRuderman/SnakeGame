(function(app){

  app.Renderer = function() {
    var self = {},
        size = 0,
        color = app.state.color.light,
        stage = app.stage,
        context = stage.context;

    self.init = function() {
      self.draw();
      size = scale(1);
      context.lineJoin = 'miter';
      context.lineWidth = 1;
    };

    // dev
    self.path = function(p) {
      context.globalAlpha = 0.1;
      context.fillStyle = color.points;
      fillBlock(p);
      context.globalAlpha = 1;
    };

    self.draw = function() {
      self.clear();
      // dev
      app.bots.collection(function(bot) {
        bot.eachPath(function(p) {
          self.path(p);
        });
      });
      // main
      app.grid.each(function(p) {
        self[p[3]](p);
      });
    };

    self.players = function(p) {
      context.fillStyle = color.players;
      context.strokeStyle = color.background;
      // fillBlock(p);
      fillArrow(p);
    };

    self.points = function(p) {
      // var style = (app.state.scale < 6) ? fillBlock : circle;
      context.fillStyle = color.points;
      context.strokeStyle = color.points;
      fillBlock(p);
    };

    self.obstacles = function(p) {
      context.fillStyle = color.background;
      context.strokeStyle = '#88' + color.obstacles;
      strokeBlock(p, [1,1]);
      // var counter = 256, hex;
      // app.obstacles.each(function(p, collectionIndex) {
      //   hexR = (256 - (collectionIndex + 1) * 16).toString(16);
      //   context.strokeStyle = '#'+ hexR + color.obstacles;
      //   strokeBlock(p, app.obstacles.size);
      // });`
    };

    self.bots = function(p) {
      context.fillStyle = color.bots;
      context.strokeStyle = color.background;
      // fillBlock(p);
      fillArrow(p);
    };

    self.borders = function(p) {
      context.fillStyle = color.borders;
      context.strokeStyle = color.borders;
      smallStrokeBlock(p, [1,1]);
      // context.font = '9pt Inconsolata';
      // context.fillStyle = color.players;
      // context.fillText(p[0] + '-' + p[1], scale(p[0]), scale(p[1]) + 12);
    };

    self.wall = function(p) {
      context.fillStyle = color.borders;
      context.strokeStyle = color.borders;
      strokeBlock(p, [1,1]);
    };

    self.clear = function() {
      context.fillStyle = color.background;
      context.strokeStyle = color.borders;
      context.fillRect(0, 0,
        scale(stage.size[0]),
        scale(stage.size[1])
      );
      // outline stage
      // context.strokeRect(0.5, 0.5,
      //   scale(stage.size[0]) - 1,
      //   scale(stage.size[1]) - 1
      // );
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

    function fillBlock(p) {
      context.fillRect(
        scale(p[0]),
        scale(p[1]),
        size - 1,
        size - 1
      );
    }

    function fillArrow(p) {
      context.beginPath();
      if (p[2]) fillArrow[p[2]](scale(p[0]), scale(p[1]));
      else fillBlock(p);
      context.fill();
      context.closePath();
    }

      fillArrow.up = function(x, y) {
        context.moveTo(x + (size/2), y);
        context.lineTo(x + size, y + size);
        context.lineTo(x, y + size);
      };

      fillArrow.right = function(x, y) {
        context.moveTo(x, y);
        context.lineTo(x + size, y + (size/2));
        context.lineTo(x, y + size);
      };

      fillArrow.down = function(x, y) {
        context.moveTo(x, y);
        context.lineTo(x + size, y);
        context.lineTo(x + (size/2), y + size);
      };

      fillArrow.left = function(x, y) {
        context.moveTo(x + size, y);
        context.lineTo(x + size,   y + size);
        context.lineTo(x, y + (size/2));
      };

    function strokeBlock(p) {
      context.strokeRect(
        scale(p[0]) - 0.5,
        scale(p[1]) - 0.5,
        size,
        size
      );
    }

    function smallStrokeBlock(p) {
      context.strokeRect(
        scale(p[0]) + 1.5,
        scale(p[1]) + 1.5,
        size - 4,
        size - 4
      );
    }

    function circle(p) {
      var radius = size / 2;
      context.beginPath();
      context.arc(
        scale(p[0]) + radius,
        scale(p[1]) + radius,
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
