var SnakeGame = SnakeGame || {};

(function(app){

  app.config = {
    SCALE: 10,
    FPS: 8, // frames per second
    FPM: 1, // frames per move
    LENGTH: 10,
    DIRECTION: 'right',
    GROW: 10,
    STAGE_SIZE: [40, 40],
    POINT_VALUE: 20
  };

  app.state = {
    score: 0
  };

})(SnakeGame);
