var Snake = Snake || {};

(function(app){

  app.Point = function() {

    var self = {
          type: 'points',
          points: [],
          size: [1, 1],
          length: app.state.length
        },
        handle = {};

    self.init = function() {
      app.events.register(handle);
    };

    self.score = function(position) {
      self.remove(position);
      self.add();
    };

    self.add = function(point) {
      if (app.hit.full())
        app.controller.gameover();
      else
        self.points.push(point || app.hit.randomFree());
    };

    self.remove = function(position) {
      self.each(function(point, index) {
        if (point[0] == position[0] && point[1] == position[1]) {
          self.points.splice(index, 1);
        }
      });
    };

    self.each = function(callback) {
      for (var i = 0, len = self.points.length; i < len; i++) {
        if (self.points[i] !== undefined) {
          callback(self.points[i], i);
        }
      }
    };

    handle.score = function(position) {
      self.each(function(point) {
        // hit
        if (position[0] == point[0] && position[1] == point[1]) {
          self.score(position);
          app.state.score += app.state.scorePointValue;
        }
      });
    };

    handle.ready = function() {
      console.log('ready');
      self.add();
    };

    handle.reset = function() {
      self.points = [];
      self.add();
    };

    self.init();

    return self;
  };

})(Snake);
