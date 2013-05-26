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

    // TODO set state to options and store options in state obj
    self.select = function(event) {
      switch (event.target.name) {
        case 'small':
          state.set({
            stageSize: [20, 20],
            scale: 20,
            length: 5,
            fps: 4
          });
          break;
        case 'medium':
          state.set({
            stageSize: [40, 40],
            scale: 10,
            length: 10,
            fps: 8
          });
          break;
        case 'large':
          state.set({
            stageSize: [170, 170],
            scale: 5,
            length: 30,
            grow: 30,
            fps: 24
          });
          break;
      }
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
