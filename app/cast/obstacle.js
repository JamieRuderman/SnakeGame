var Snake = Snake || {};

(function(app){

  app.Obstacle = function() {

    var self = new app.Member();

    self.type = 'obstacles';
    self.length = app.state.obstaclesLength;

    self.create = function() {
      self.every(function() {
        self.grow(self.position);
      });
    };

    self.every = function(callback) {
      for (var i = 0; i < self.length; i++) {
        callback(self.segments[i], i);
      }
    };

    self.init();

    return self;
  };

})(Snake);