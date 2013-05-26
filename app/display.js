var SnakeGame = SnakeGame || {};

(function(app){

  app.Display = function() {

    var self = {
          value: {},
          el: {}
        };

    self.init = function() {
      self.el.score = $('.score');
    };

    /* updates an element if the value has changed */
    self.update = function() {
      var state = app.state;

      for (var key in self.el) {
        // if changed
        if (self.value[key] !== state[key]) {
          self.value[key] = state[key];
          self.el[key].text(state[key]);
        }
      }
    };

    self.init();

    return self;
  };

})(SnakeGame);
