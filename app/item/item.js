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

    self.add = function(position) {
      if (app.hit.full())
        app.events.trigger('gameover');
      else
        self.items.push(position || app.hit.randomFree());
    };

    self.remove = function(position) {
      self.each(function(item, index) {
        if (position[0] == item[0] && position[1] == item[1]) {
          self.items.splice(index, 1);
        }
      });
    };

    self.get = function(position) {
      var result = false;
      self.each(function(item, index) {
        if (position[0] == item[0] && position[1] == item[1]) {
          result = item;
        }
      });
      return result;
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
