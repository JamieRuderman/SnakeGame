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
      menu.on('click', '.select', self.select);
      start = $('.start');
      end = $('.end');
    };

    self.select = function(event) {
      state.set(event.target.name);
      start.hide();
      app.start();
    };

    self.gameover = function() {
      console.log('end show');
      end.show();
    };

    $(document).ready(function() {
      self.init();
    });

    return self;

  })();

})(SnakeGame);
