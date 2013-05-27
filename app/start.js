var SnakeGame = SnakeGame || {};

(function(app){

  app.start = function() {
    // start snake game
    app.audio = new app.Audio();
    app.snake = new app.Snake();
    app.points = new app.Points();
    app.stage = new app.Stage();
    app.renderer = new app.Renderer();
    app.display = new app.Display();
    app.timer = new app.Timer();
    app.controller = new app.Controller();
  };

})(SnakeGame);