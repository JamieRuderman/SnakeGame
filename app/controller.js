var Snake = Snake || {};

(function(app){

  app.Controller = function() {
    var self = {},
        handle = {},
        direction, moving;

    self.init = function() {
      handle.reset();
      app.events.register(handle);
    };

    self.move = function() {
      direction = app.hit.noReverse(moving, direction);
      moving = direction;
      app.players.collection(function(player) {
        player.advance(direction);
      });
      app.bots.collection(function(bot) {
        bot.advance();
      });
    };

    self.changeDirection = function(event) {

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

    handle.gameover = function() {
      $(window).off('keydown', self.changeDirection);
    };

    handle.reset = function() {
      $(window).on('keydown', self.changeDirection);
      app.state.score = 0;
      direction = app.state.direction;
    };

    self.init();

    return self;
  };

})(Snake || {});
