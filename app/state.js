var SnakeGame = SnakeGame || {};

(function(app){

  app.config = {
    SCALE: 20,
    FPS: 20, // frames per second
    FPM: 10, // frames per move
    LENGTH: 10,
    DIRECTION: 'right',
    GROW: 20,
    STAGE_SIZE: [9, 9],
    POINT_VALUE: 20
  };

  app.state = {
    score: 0
  };

})(SnakeGame);
