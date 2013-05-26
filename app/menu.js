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

  app.Menu = (function() {

    var self = {},
        state = app.state,
        menu,
        kinds = [
          'start',
          'end'
        ];

    self.init = function() {
      console.log('menu init');
      menu = $('.menu');
      menu.on('click', '.select', self.select);
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
            stageSize: [80, 80],
            scale: 5,
            length: 20,
            fps: 16
          });
          break;
      }
      menu.hide();
      app.start();
    };

    $(document).ready(function() {
      self.init();
    });

    return self;

  })();

})(SnakeGame);
