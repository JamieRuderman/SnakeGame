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
        menu, end, start,
        kinds = [
          'start',
          'end'
        ];

    self.init = function() {
      menu = $('.menu');
      start = $('.start');
      start.on('click', '.select', self.startHandler);
      end = $('.end');
      end.on('click', '.select', self.endHandler);
    };

    self.start = function() {
      start.show();
    };

    self.gameover = function() {
      end.show();
    };

    self.startHandler = function(event) {
      state.set(event.target.name);
      start.hide();
      app.start.game();
    };

    self.endHandler = function(event) {
      if (event.target.name == 'restart') {
        app.controller.reset();
      }
      else if (event.target.name == 'menu') {
        self.start();
      }
      end.hide();
    };

    return self;

  })();

})(SnakeGame);
