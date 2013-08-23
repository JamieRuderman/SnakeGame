var Snake = Snake || {};

(function(app){

  app.Item = function() {

    var self = {
          items: []
        };

    self.hit = function(position) {
      self.remove(position);
      self.add();
    };

    self.add = function(item) {
      if (app.hit.full())
        app.events.trigger('gameover');
      else
        self.items.push(item || app.hit.randomFree());
    };

    self.remove = function(position) {
      self.each(function(item, index) {
        if (item[0] == position[0] && item[1] == position[1]) {
          self.items.splice(index, 1);
        }
      });
    };

    self.each = function(callback) {
      for (var i = 0, len = self.items.length; i < len; i++) {
        if (self.items[i] !== undefined) {
          callback(self.items[i], i);
        }
      }
    };

    /* TODO: Find closest item to a position - currently just returning the last */
    self.getClosest = function(position) {
      var item = false;
      self.each(function(p) {
        item = p;
      });
      return item;
    };

    return self;
  };

})(Snake);
