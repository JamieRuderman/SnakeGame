var Snake = Snake || {};

(function(app){

  app.Points = function() {

    var self = new app.Item(),
        handle = {};

    self.type = 'points';

    self.init = function() {
      app.events.register(handle, 'game');
    };

    /* ----- Event handles ----- */

    handle.score = function(position, id) {
      self.hit(position);
    };

    handle.steal = function(position, id) {
      self.hit(position);
    };

    handle.ready = function() {
      self.add();
    };

    handle.reset = function() {
      self.items = [];
      self.add();
    };

    self.init();

    return self;
  };

})(Snake);
