

var SnakeGame = {};

(function(app){

  var config = {
    scale: 12,
    // speed: 1
  };

  app.start = function() {
    // start snake game
    $(document).ready(function() {
      app.segment = new Segment();
      app.stage = new Stage();
      app.renderer = new Renderer();
      app.controller = new Controller();
    });
  };

  var Stage = function() {
    var self = {
      // width, height in blocks
      size: [50, 50],
      position: [0, 0],
      el: $('.stage'),
      name: 'stage'
    };

    return self;
  };

  var Segment = function() {
    var self = {
      size: [1, 1],
      position: [0, 0],
      el: $('.snake'),
      name: 'segment'
    };

    return self;
  };

  var Controller = function() {
    var self = {},
        stage = app.stage,
        segment = app.segment;

    self.init = function() {
      $(window).on('keydown', self.keyHandler);
    };

    self.keyHandler = function(event) {
      var move = true,
          direction;

      switch (event.keyCode) {
        case 37: // left
          segment.position[0] -= 1;
          break;
        case 38: // up
          segment.position[1] -= 1;
          break;
        case 39: // right
          segment.position[0] += 1;
          break;
        case 40: // down
          segment.position[1] += 1;
          break;
        default:
          move = false;
      }

      if (move) {
        self.checkBorder();
        app.renderer.draw();
      }

    };

    self.checkBorder = function() {
      // left / right
      if (segment.position[0] < 0) {
        segment.position[0] = 0;
      } else if (segment.position[0] >= stage.size[0]) {
        segment.position[0] = stage.size[0] - 1;
      }

      // up / down
      if (segment.position[1] < 0) {
        segment.position[1] = 0;
      } else if (segment.position[1] >= stage.size[1]) {
        segment.position[1] = stage.size[1] - 1;
      }
    };

    self.init();

  };

  var Renderer = function() {
    var self = {},
        body = $('body'),
        scale = config.scale,
        stage = app.stage,
        segment = app.segment;

    self.init = function() {
      self.add(stage);
      self.center(segment);
      self.add(segment);
    };

    self.draw = function() {
      self.position(segment);
    };

    self.add = function(sprite) {
      body.append(sprite.el);
      self.size(sprite);
      self.position(sprite);
    };

    self.position = function(sprite) {
      sprite.el.css({
        top: (sprite.position[1] * scale) + 'px',
        left: (sprite.position[0] * scale) + 'px'
      });
    };

    self.size = function(sprite) {
      sprite.el.css({
        width: sprite.size[0] * scale,
        height: sprite.size[1] * scale
      });
    };

    self.center = function(sprite) {
      sprite.position = [
        stage.size[0]/2,
        stage.size[1]/2
      ];
    };

    self.init();

    return self;

  };

})(SnakeGame);
