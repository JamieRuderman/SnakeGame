(function(app){

  app.Powerups = function() {

    var self = new app.Item(),
        handle = {};

    self.type = 'powerups';

    self.init = function() {
      app.events.register(handle, 'game');
    };

    /* ----- Event handles ----- */

    handle.powerup = function(position, id) {
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

})(Snake || {});
