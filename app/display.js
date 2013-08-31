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

    self.addScores = function(member) {
      var label = ' ',
          shorten = app.cast.length() > 10;

      if (member.type == 'bots' || member.type == 'players') {
        el[member.id] = $('<span></span>').add('<span></span>');
        label += (shorten ? member.display[0] : member.display) + (member.id +1);
        el[member.id].css({
          color: state.color.light.players[member.id]
        });
        $('.scores').append(label).append(el[member.id][0]);
        $('.finalscores').append(label).append(el[member.id][1]);
      }
    };

    /* Event handling ----- */

    handle.gameover = function() {
      // var el;
      // app.cast.each(function(member) {
      //   self.addScores('finalscores', el, member);
      // });
    };

    /* Private -------------- */

    function init() {
      app.events.register(handle);

      // Create scores display on the el obj
      $('.scores').empty();
      $('.finalscores').empty();

      app.cast.each(function(member) {
        self.addScores(member);
      });

      console.log(el);
      window.foo = el;

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
