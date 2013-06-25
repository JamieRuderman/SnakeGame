var SnakeGame = SnakeGame || {};

(function(app){

  app.Bot = function(options) {

    var self = new app.Member(options);

    $.extend(self, {
      size: [1, 1],
      length: app.state.length,
      turnChance: 0.90
    });

    self.init();

    return self;
  };

})(SnakeGame);