var SnakeGame = SnakeGame || {};

(function(app){

  app.start = function() {
    // start snake game
    $(document).ready(function() {
      app.snake = new app.Snake();
      app.points = new app.Points();
      app.stage = new app.Stage();
      app.renderer = new app.Renderer();
      app.display = new app.Display();
      app.controller = new app.Controller();
      app.timer = new app.Timer();
    });
  };

  app.start();

})(SnakeGame);
