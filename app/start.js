var SnakeGame = SnakeGame || {};

(function(app){

  app.start = (function() {

    var self = {};

    self.init = function() {
      app.menu.init();
      app.audio.init();
    };

    self.game = function() {
      // start snake game
      app.snake      = new app.Snake();
      app.points     = new app.Points();
      app.stage      = new app.Stage();
      app.renderer   = new app.Renderer();
      app.display    = new app.Display();
      app.timer      = new app.Timer();
      app.hit        = new app.Hit();
      app.obstacle   = new app.Obstacle();
      app.controller = new app.Controller();
    };

    $(document).ready(function() {
      self.init();
    });

    return self;

  })();

})(SnakeGame);
