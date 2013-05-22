var SnakeGame = SnakeGame || {};

(function(app){

  app.config = {
    scale: 10,
    fps: 40, // frames per second
    fpm: 5, // frames per move
    length: 10,
    direction: 'none',
    grow: 5
  };

  app.start = function() {
    // start snake game
    $(document).ready(function() {
      app.snake = new app.Snake();
      app.points = new app.Points();
      app.stage = new app.Stage();
      app.renderer = new app.Renderer();
      app.controller = new app.Controller();
      app.timer = new app.Timer();
    });
  };

  app.start();

})(SnakeGame);
