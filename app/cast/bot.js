var SnakeGame = SnakeGame || {};

(function(app){

  app.Bot = function() {

    var self = new app.Member();

    $.extend(self, {
      size: [1, 1],
      length: app.state.length,
      turnChance: 0.90
    });

    self.init();

    return self;
  };

})(SnakeGame);