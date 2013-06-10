var SnakeGame = SnakeGame || {};

(function(app){

  // @TODO - FINISH BOT - NOT ENABLED
  app.Bot = function() {

    var self = new app.Member();

    self.size = [1, 1];
    self.length = app.state.length;

    self.init();

    return self;
  };

})(SnakeGame);