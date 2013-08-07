var Snake = Snake || {};

(function(app){

  app.Point = function() {

    var self = {
          type: 'points',
          points: [],
          length: app.state.length
        },
        handle = {};

    self.init = function() {
      app.events.register(handle);
    };

    self.hit = function(position) {
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

    /* TODO: Find closest point to a position */
    self.getClosest = function(position) {
      var point = false;
      self.each(function(p) {
        point = p;
      });
      return point;
    };

    handle.score = function(position) {
      app.state.score += app.state.scorePointValue;
      self.hit(position);
    };

    handle.steal = function(position) {
      app.state.score -= app.state.stealPointValue;
      self.hit(position);
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
