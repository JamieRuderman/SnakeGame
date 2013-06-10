var SnakeGame = SnakeGame || {};

(function(app){

  // @TODO - FINISH BOT - NOT ENABLED
  app.Bot = function() {

    var self = new app.Member();

    self.size = [1, 1];
    self.length = app.state.length;
    self.turnChance = 0.95;

    self.init();

    return self;
  };

})(SnakeGame);