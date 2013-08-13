(function(app){

  app.Display = function() {

    var self = {},
        value = {},
        el = {},
        handle = {},
        fpsEl,
        state = app.state;

    self.refresh = function() {
      fps();
      // scores
      update(state.scores);
    };

    self.add = function(target, selector, label) {
      el[selector] = $('<span></span>');
      $('.'+ target).append(label).append(el[selector]);
    };

    /* Event handling ----- */

    handle.gameover = function() {
      $('.finalscores').empty();
      app.cast.collection(function(member) {
        if (member.type == 'bots' || member.type == 'players') {
          $('.finalscores').append(member.display).append('<span>'+ state.scores[member.id] +'</span>');
        }
      });
    };

    /* Private -------------- */

    function init() {
      app.events.register(handle);

      // Create scores display on the el obj
      $('.scores').empty();
      app.cast.collection(function(member) {
        if (member.type == 'bots' || member.type == 'players') {
          self.add('scores', member.id, member.display);
          state.scores[member.id] = 0;
        }
      });

      // independant of the el object for performance
      fpsEl = $('.fps');
      fpsEl.toggle(app.state.fpsDisplay);
    }

    /* updates an element if the value has changed in the state */
    function update(path) {
      for (var key in el) {
        // if changed
        if (changed(path, key)) {
          el[key].text(path[key]);
        }
      }
    }

    function changed(path, key) {
      if (value[key] !== path[key]) {
        value[key] = path[key];
        return true;
      }
      return false;
    }

    function fps() {
      if (changed(state, 'fpsDisplay')) {
        fpsEl.toggle(state.fpsDisplay);
      }
      if (state.fpsDisplay) {
        fpsEl.text('fps:' + app.timer.fps.cur +
                   ' min:' + app.timer.fps.min +
                   ' max:' + app.timer.fps.max);
      }
    }

    init();

    return self;
  };

})(Snake || {});
