(function(app){

  app.Controller = function() {
    var self = {},
        handle = {},
        keydown = false,
        locked = false,
        direction, moving;

    self.init = function() {
      handle.reset();
      app.events.register(handle, 'game');
    };

    self.move = function() {
      self.speedCheck();
      direction = app.hit.isReverse(moving, direction) ? moving : direction;
      moving = direction || moving;
      app.players.collection(function(player) {
        player.advance(moving);
      });
      app.bots.collection(function(bot) {
        bot.advance();
      });
      direction = null;
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

    /* Event handling ----- */

    /* Prevent same key autorepeat */
    handle.keydown = handle.keyup = function(event) {
      if (locked) return;

      if (event.type == 'keydown' && keydown != event.keyCode) {
        keydown = event.keyCode;
        self.keydown(event);
      }
      else if (event.type == 'keyup') {
        keydown = false;
      }
    };

    handle.gameover = function() {
      locked = true;
    };

    handle.reset = function() {
      locked = false;
      direction = app.state.direction;
    };

    self.init();

    return self;

  };

})(Snake || {});
