var SnakeGame = SnakeGame || {};

/*
  game modes ideas
    adventure - explore and find items
    survival - see how long you can get
    tiny - slow step based
    combat - with computer or 2 player
    surround?
    obstacles
    shooting

    clear levels. to advance.
*/

(function(app){

  app.menu = (function() {

    var self = {},
        state = app.state,
        menu, gameover, begin;

    self.init = function() {
      menu = $('.menu');
      begin = $('.begin');
      gameover = $('.gameover');
      self.begin();
    };

    // show start menu
    self.begin = function() {
      begin.show();
      gameover.hide();
      eventsOn();
    };

    // show gameover menu
    self.gameover = function() {
      gameover.show();
      eventsOn();
    };

    /* Private -------------- */

    beginHandler = function(event) {
      begin.hide();
      eventsOff();
      state.set(event.target.name);
      app.start.newgame();
    };

    gameoverHandler = function(event) {
      gameover.hide();
      eventsOff();
      if (event.target.name == 'restart') {
        app.controller.reset();
      }
      else if (event.target.name == 'menu') {
        self.begin();
      }
    };

    eventsOn = function() {
      begin.on('click', '.select', beginHandler);
      gameover.on('click', '.select', gameoverHandler);
    };

    eventsOff = function() {
      begin.off('click', '.select', beginHandler);
      gameover.off('click', '.select', gameoverHandler);
    };

    return self;

  })();

})(SnakeGame);
