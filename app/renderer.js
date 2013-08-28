(function(app){
  /*
    TODO: 1. separeate background onto another layer an in a separate file which manages redraw.
          2. draw all lines and stroke them at once (http://www.html5rocks.com/en/tutorials/canvas/performance/)
  */


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

    self.draw = function() {
      self.clear();
      // dev
      app.bots.each(function(bot) {
        bot.eachPath(function(p) {
          self.path(p[0], p[1]);
        });
      });

      // main
      app.grid.each(function(x, y, options) {
        self[options.type](x, y, options);
      });
    };

    // dev
    self.path = function(x, y) {
      context.globalAlpha = 0.1;
      context.fillStyle = color.points;
      fillBlock(x, y);
      context.globalAlpha = 1;
    };

    self.players = function(x, y, options) {
      context.save();
      context.strokeStyle = (options.obj.powerupCount % 2 === 0) ? color.players : color.powerups;
      drawSegment(x, y, options);
      context.restore();

      // context.font = '9pt Inconsolata';
      // context.fillStyle = '#000000';
      // context.fillText(options.from +','+ options.to, scale(x), scale(y) + 12);
    };

    self.bots = function(x, y, options) {
      context.save();
      context.fillStyle = color.bots;
      context.strokeStyle = color.bots;
      drawSegment(x, y, options);
      context.restore();
    };

    self.points = function(x, y, options) {
      // var style = (app.state.scale < 6) ? fillBlock : fillCircle;
      context.fillStyle = color.points;
      context.strokeStyle = color.points;
      fillCircle(x, y);
    };

    self.powerups = function(x, y, options) {
      context.fillStyle = color.powerups;
      context.strokeStyle = color.powerups;
      fillCircle(x, y);
    };

    self.doorways = function(x, y, options) {
      context.save();
      context.lineWidth = 3;
      context.fillStyle = color.doorways;
      context.strokeStyle = color.doorways;
      strokeCircle(x, y);
      context.restore();
    };

    self.obstacles = function(x, y, options) {
      context.fillStyle = color.background;
      context.strokeStyle = '#88' + color.obstacles;
      strokeBlock(x, y);
      // var counter = 256, hex;
      // app.obstacles.each(function(p, collectionIndex) {
      //   hexR = (256 - (collectionIndex + 1) * 16).toString(16);
      //   context.strokeStyle = '#'+ hexR + color.obstacles;
      //   strokeBlock(p, app.obstacles.size);
      // });`
    };

    self.borders = function(x, y, options) {
      context.fillStyle = color.borders;
      context.strokeStyle = color.borders;
      smallStrokeBlock(x, y);
      // context.font = '9pt Inconsolata';
      // context.fillStyle = color.players;
      // context.fillText(x + '-' + y, scale(x), scale(y) + 12);
    };

    self.wall = function(x, y, options) {
      context.fillStyle = color.borders;
      context.strokeStyle = color.borders;
      strokeBlock(x, y);
    };

    self.clear = function() {
      context.fillStyle = color.background;
      context.strokeStyle = color.borders;
      context.fillRect(0, 0,
        scale(stage.size[0]),
        scale(stage.size[1])
      );
    };

    // rotate stage
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

    function fillBlock(x, y) {
      context.fillRect(
        scale(x),
        scale(y),
        size - 1,
        size - 1
      );
    }

    function drawSegment(x, y, options) {
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = size -4;//size/2;
      context.beginPath();
      drawSegment[options.from]('moveTo', x, y, options);
      drawSegment.center('lineTo', x, y, options);
      drawSegment[options.to]('lineTo', x, y, options);
      context.stroke();

      // Draw the eyes last
      if (options.to == 'head') drawSegment.eyes(x, y, options);
    }

    drawSegment.up = function(cmd, x, y) {
      context[cmd](scale(x) + (size/2), scale(y));
    };

    drawSegment.right = function(cmd, x, y) {
      context[cmd](scale(x) + size, scale(y) + (size/2));
    };

    drawSegment.down = function(cmd, x, y) {
      context[cmd](scale(x) + (size/2), scale(y) + size);
    };

    drawSegment.left = function(cmd, x, y) {
      context[cmd](scale(x), scale(y) + (size/2));
    };

    drawSegment.center = function(cmd, x, y) {
      context[cmd](scale(x) + (size/2), scale(y) + (size/2));
    };

    drawSegment.head = function(cmd, x, y, options) {
      // drawSegment.center.apply(this, arguments);
      // drawSegment[app.hit.opposite(options.from)](cmd, x, y);
    };

    drawSegment.tail = function(cmd, x, y, options) {
      // drawSegment.center.apply(this, arguments);
      // drawSegment[app.hit.opposite(options.to)](cmd, x, y);
    };

    drawSegment.none = function() {
      console.log('none.   -__-');
    };

    drawSegment.eyes = function(x, y, options) {
      var rotate = options.from == 'up' || options.from == 'down';
      context.save();
      context.fillStyle = color.background;
      if (rotate) {
        context.fillRect(scale(x) + (size/2) - 4, scale(y) + (size/2), 2, 2);
        context.fillRect(scale(x) + (size/2) + 2, scale(y) + (size/2), 2, 2);
      }
      else {
        context.fillRect(scale(x) + (size/2), scale(y) + (size/2) - 4, 2, 2);
        context.fillRect(scale(x) + (size/2), scale(y) + (size/2) + 2, 2, 2);
      }
      context.restore();
    };

    function fillArrow(x, y, options) {
      context.beginPath();
      if (options.from) fillArrow[app.hit.opposite(options.from)](scale(x), scale(y));
      else fillCircle(x, y);
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

    fillArrow.head = fillArrow.tail = function(x, y) {
      // for now
      fillBlock([x,y]);
    };

    function strokeBlock(x, y) {
      context.strokeRect(
        scale(x) - 0.5,
        scale(y) - 0.5,
        size,
        size
      );
    }

    function smallStrokeBlock(x, y) {
      context.strokeRect(
        scale(x) + 1.5,
        scale(y) + 1.5,
        size - 4,
        size - 4
      );
    }

    function fillCircle(x, y) {
      var radius = size / 2;
      context.beginPath();
      context.arc(
        scale(x) + radius,
        scale(y) + radius,
        radius - 1,
        0, Math.PI * 2, true
      );
      context.closePath();
      context.fill();
      context.stroke();
    }

    function strokeCircle(x, y) {
      var radius = size / 2;
      context.beginPath();
      context.arc(
        scale(x) + radius,
        scale(y) + radius,
        radius - 1,
        0, Math.PI * 2, true
      );
      context.closePath();
      context.stroke();
    }

    function scale(size) {
      return Math.round(size * app.state.scale);
    }

    self.init();

    return self;
  };

})(Snake || {});
