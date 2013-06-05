var SnakeGame = SnakeGame || {};

(function(app){

  app.start = (function() {

    var self = {};

    self.init = function() {
      app.menu.init();
      app.audio.init();
    };

    self.newgame = function() {
      // start snake game
      app.points     = new app.Points();
      app.stage      = new app.Stage();
      app.obstacles.init();
      app.snake      = new app.Snake();
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
