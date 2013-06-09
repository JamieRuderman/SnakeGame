var SnakeGame = SnakeGame || {};

(function(app){

  app.Display = function() {

    var self = {},
        value = {},
        el = {},
        fpsEl,
        state = app.state;

    /* updates an element if the value has changed */
    self.update = function() {

      if (state.fpsDisplay) fps();

      for (var key in el) {
        // if changed
        if (changed(key)) {
          el[key].text(state[key]);
        }
      }
    };

    // Private ----------------------------

    init = function() {
      el.score = $('.score');
      // independant of the el object for performance
      fpsEl = $('.fps');
      fpsEl.toggle(app.state.fpsDisplay);
    };

    changed = function(key) {
      if (value[key] !== state[key]) {
        value[key] = state[key];
        return true;
      }
      return false;
    }

    fps = function() {
      if (changed('fpsDisplay')) {
        fpsEl.toggle(app.state.fpsDisplay);
      }
      fpsEl.text(app.timer.fps);
    };

    init();

    return self;
  };

})(SnakeGame);
