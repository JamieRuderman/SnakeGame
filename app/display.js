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

    self.update = function() {
      var state = app.state;

      for (var key in state) {
        // if changed
        if (self.value[key] !== state[key]) {
          self.value[key] = state[key];
          self.el[key].text(state[key]);
          console.info(key, ':', state[key]);
        }
      }
    };

    self.init();

    return self;
  };

})(SnakeGame);
