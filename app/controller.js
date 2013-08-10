var Snake = Snake || {};

(function(app){

  app.Controller = function() {
    var self = {},
        handle = {},
        keydown = false,
        direction, moving;

    self.init = function() {
      handle.reset();
      app.events.register(handle);
    };

    self.move = function() {
      self.speedCheck();
      direction = app.hit.noReverse(moving, direction);
      moving = direction || moving;
      app.players.collection(function(player) {
        player.advance(moving);
      });
      app.bots.collection(function(bot) {
        bot.advance();
      });
      direction = null;
    };

    /* prevent same key autorepeat */
    self.keyHandler = function(event) {
      if (event.type == 'keydown' && keydown != event.keyCode) {
        keydown = event.keyCode;
        self.keydown(event);
      }
      else if (event.type == 'keyup') {
        keydown = false;
      }
    };

    self.keydown = function(event) {
      switch (event.keyCode) {
        case 70: // f
          app.state.toggle('fpsDisplay');
          break;
        case 37: // left
        case 65: // a
          direction = 'left';
          break;
        case 39: // right
        case 68: // d
          direction = 'right';
          break;
        case 38: // up
        case 87: // w
          direction = 'up';
          break;
        case 40: // down
        case 83: // s
          direction = 'down';
          break;
        case 32: // space
        case 27: // esc
          app.events.trigger('pause');
          break;
      }

      if (app.timer.ready && direction != 'none') {
        app.timer.start();
      }

    };

    self.speedCheck = function() {
      var speed = false;
      if (moving == direction)
        app.timer.accelerate();
      else if (
        (moving == 'left' && direction =='right') ||
        (moving == 'right' && direction =='left') ||
        (moving == 'up' && direction =='down') ||
        (moving == 'down' && direction =='up')
      ) {
        app.timer.deccelerate();
      }
    };

    handle.gameover = function() {
      $(window).off('keydown', self.keyHandler);
      $(window).off('keyup', self.keyHandler);
    };

    handle.reset = function() {
      $(window).on('keydown', self.keyHandler);
      $(window).on('keyup', self.keyHandler);
      app.state.score = 0;
      direction = app.state.direction;
    };

    self.init();

    return self;
  };

})(Snake || {});
