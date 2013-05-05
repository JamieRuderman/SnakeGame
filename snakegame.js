

var SnakeGame = {};

(function(app){

  var config = {
    scale: 12,
    speed: 1
  };

  app.start = function() {
    // start snake game
    $(document).ready(function() {
      app.head = new Head();
      app.stage = new Stage();
      app.renderer = new Renderer();
      app.controller = new Controller();
    });
  };

  var Stage = function() {
    // width, height in px
    var self = {
      size: [50, 50],
      css: {
        'background': 'red',
      }
    };

    return self;
  };

  var Head = function() {
    var self = {
        size: 1,
        position: [0, 0],
        css: {
        'background': 'white',
        'box-shadow': 'black 0px 0px 0px 1px inset'
        }
      };

    return self;
  };

  var Controller = function() {
    var self = {},
        stage = app.stage,
        head = app.head;

    self.init = function() {
      $(window).on('keydown', self.keyHandler);
    };

    self.keyHandler = function(event) {
      var move = true,
          direction;

      switch (event.keyCode) {
        case 37: // left
          head.position[0] -= head.speed;
          break;
        case 38: // up
          head.position[1] -= head.speed;
          break;
        case 39: // right
          head.position[0] += head.speed;
          break;
        case 40: // down
          head.position[1] += head.speed;
          break;
        default:
          move = false;
      }

      if (move) {
        self.checkBorder();
        renderer.draw();
      }

    };

    self.checkBorder = function() {
      // left / right
      if (head.position[0] < 0) {
        head.position[0] = 0;
      } else if (head.position[0] >= stage.size[0]) {
        head.position[0] = stage.size[0] - 1;
      }

      // up / down
      if (head.position[1] < 0) {
        head.position[1] = 0;
      } else if (head.position[1] >= stage.size[1]) {
        head.position[1] = stage.size[1] - 1;
      }
    };

    self.init();

  };

  var Renderer = function() {

    var self = {};

    var stage = app.stage,
        head = app.head;

    self.init = function() {
      $('body').append(stage.el);
      stage.el.append(head.el);
      head.position = [
        stage.size[0]/2,
        stage.size[1]/2
      ];
      self.draw();
    };

    self.draw = function() {
      head.el.css({
        top: (head.position[1] * config.scale) + 'px',
        left: (head.position[0] * config.scale) + 'px'
      });
    };

    self.init();

    return self;

  };

})(SnakeGame);
