var SnakeGame = SnakeGame || {};

(function(app){

  app.start = (function() {

    var self = {};

    self.init = function() {
      app.state.init();
      app.menu.init();
      app.audio.init();
    };

    self.newgame = function() {
      // start player game
      app.points     = new app.Points();
      app.stage      = new app.Stage();
      app.obstacles  = new app.Cast({
        member: app.Obstacle,
        length: app.state.obstacles
      });
      // app.bots.init();
      app.player      = new app.Player();
      app.display    = new app.Display();
      app.renderer   = new app.Renderer();
      app.timer      = new app.Timer();
      app.controller = new app.Controller();
    };

    $(document).ready(function() {
      self.init();
    });

    return self;

  })();

})(SnakeGame);
