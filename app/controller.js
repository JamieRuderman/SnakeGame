var SnakeGame = SnakeGame || {};

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

    self.center = function(sprite) {
      sprite.position = [
        Math.round(stage.size[0] / 2) - 1,
        Math.round(stage.size[1] / 2) - 1
      ];
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

    self.addPoint = function() {
      if (app.hit.full()) {
        self.gameover();
      }
      else {
        points.add(app.hit.randomFree());
      }
    };

    // @TODO - ask for a hit check and return what it hit.
    self.checkHit = function(position) {
      if (app.hit.check('player', position)) {
        self.gameover();
      }
      if (app.hit.check('obstacles', position)) {
        self.gameover();
      }
      if (app.hit.check('bots', position)) {
        self.gameover();
      }
      if (app.hit.check('border', position)) {
        self.gameover();
      }
      if (app.hit.check('points', position)) {
        player.length += state.grow;
        points.remove(player.position);
        self.addPoint();
        state.score += state.pointValue;
        app.audio.score();
        // every set number of points go faster
        if (state.score % (state.pointValue * state.pointsToIncreaseSpeed) === 0) {
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
      // @TODO trigger and handle as event (reset)
      $(window).on('keydown', self.changeDirection);
      state.score = 0;
      direction = state.direction;
      self.center(player);
      player.reset();
      player.addSegment(player.position);
      points.reset();
      self.addPoint();
      app.timer.reset();
      app.audio.reset();
      app.audio.start();
      app.renderer.draw();
      app.display.update();
    };

    self.init();

    return self;
  };

})(SnakeGame);
