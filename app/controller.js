var Snake = Snake || {};

(function(app){

  app.Controller = function() {
    var self = {},
        stage = app.stage,
        player = app.player,
        points = app.points,
        state = app.state,
        direction, moving;

    self.init = function() {
      self.reset();
      app.events.on('reset', self.reset);
    };

    self.move = function() {
      direction = app.hit.noReverse(moving, direction);
      moving = direction;
      player.position = app.hit.move(direction, player.position);
      self.checkHit(player.position);
      player.advance();
      app.bots.collection(function(bot){
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
          app.timer.pause();
          app.audio.pause();
          break;
      }

      if (app.timer.ready && direction != 'none') {
        app.timer.start();
      }

    };

    // TODO: combine this hit check with the member hit checking...
    self.checkHit = function(position) {
      var cell = app.grid.occupied(position);

      switch (cell) {
        case 'player':
        case 'obstacles':
        case 'bots':
        case 'border':
          self.gameover();
          break;
        case 'points':
          player.length += state.grow;
          points.score(position);
          state.score += state.scorePointValue;
          app.audio.play('score');
          // every set number of points go faster
          if (state.score % (state.scorePointValue * state.pointsToIncreaseSpeed) === 0) {
            app.timer.increase();
          }
      }
    };

    self.gameover = function() {
      $(window).off('keydown', self.changeDirection);
      app.timer.stop();
      app.menu.gameover();
      app.audio.gameover();
    };

    self.reset = function() {
      $(window).on('keydown', self.changeDirection);
      state.score = 0;
      direction = state.direction;
    };

    self.init();

    return self;
  };

})(Snake || {});
