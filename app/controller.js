(function(app){

  app.Controller = function() {
    var self = {},
        handle = {},
        keydown = false,
        locked = false,
        command = [];

    self.init = function() {
      handle.reset();
      app.events.register(handle, 'game');
    };

    self.move = function() {
      app.players.each(function(player, index) {
        self.speedCheck(player.position[2], command[index]);
        player.advance(command[index]);
      });
      app.bots.each(function(bot) {
        bot.advance();
      });
      command = [];
    };

    self.keydown = function(event) {
      var arrows = false,
          asdw = false;

      switch (event.keyCode) {
        case 70: app.state.toggle('fpsDisplay'); break; // f
        case 37: arrows = 'left';  break; // left
        case 39: arrows = 'right'; break; // right
        case 38: arrows = 'up';    break; // up
        case 40: arrows = 'down';  break; // down
        case 65: asdw = 'left';    break; // a
        case 68: asdw = 'right';   break; // d
        case 87: asdw = 'up';      break; // w
        case 83: asdw = 'down';    break; // s
        case 32: // space
        case 27: // esc
          app.events.trigger('pause');
          break;
      }

      if (arrows || asdw) {

        if (app.state.players == 1) {
          command[0] = (arrows || asdw);
        }
        else {
          command[0] = arrows || command[0]
          command[1] = asdw || command[1];
        }

        if (app.timer.ready) {
          app.timer.start();
        }
      }

    };

    self.speedCheck = function(moving, direction) {
      var speed = false;
      if (moving == direction)
        app.timer.accelerate();
      else if (
        (moving == 'left'  && direction =='right') ||
        (moving == 'right' && direction =='left')  ||
        (moving == 'up'    && direction =='down')  ||
        (moving == 'down'  && direction =='up')
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
    };

    self.init();

    return self;

  };

})(Snake || {});
