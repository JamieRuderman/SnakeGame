var SnakeGame = SnakeGame || {};

(function(app){

  app.Bot = function() {

    var self = new app.Member();

    self.size = [1, 1];
    self.length = app.state.length;
    self.turnChance = 0.90;

    self.init();

    return self;
  };

})(SnakeGame);