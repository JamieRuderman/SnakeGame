var SnakeGame = SnakeGame || {};

(function(app){

  app.config = {
    scale: 10,
    fps: 40, // frames per second
    fpm: 5, // frames per move
    length: 10,
    direction: 'none',
    grow: 5,
    STAGE_SIZE: [40, 40],
    POINT_VALUE: 20
  };

  app.state = {
    score: 0
  };

})(SnakeGame);
