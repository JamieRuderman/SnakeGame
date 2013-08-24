(function(app){

  app.Doorways = function() {

    var self = new app.Item(),
        handle = {},
        index = 0;

    self.type = 'doorways';

    self.init = function() {
      app.events.register(handle, 'game');
    };

    self.addPair = function(a, b) {
      a = a || app.hit.randomFree();
      b = b || app.hit.randomFree();
      a.push(index);
      b.push(index++);
      self.add(a);
      self.add(b);
    };

    self.getPair = function(position) {
      var target = self.get(position),
          pair = false;

      self.each(function(item) {
        if (target[3] == item[3] &&
           (target[0] != item[0] || target[1] != item[1])) {
          pair = item;
        }
      });
      return pair;
    };

    /* ----- Event handles ----- */

    handle.ready = function() {
      self.addPair();
    };

    handle.reset = function() {
      self.items = [];
      self.addPair();
    };

    self.init();

    return self;

  };

})(Snake || {});
