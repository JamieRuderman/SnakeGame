var SnakeGame = SnakeGame || {};

(function(app){

  /*
    events: {
      'render': [
        draw callback,
        snake callback
      ]
    }
  */
  app.events = {

    events: {},

    on: function(name, callback) {
      var ev = this.events[name];
      this.events[name] = ev || [];
      this.events[name].push(callback);
    },

    off: function(name, callback) {
      var ev = this.events[name],
          index = ev.indexOf(callback);
      ev.splice(index, 1);
    },

    trigger: function(name) {
      var ev = this.events[name];
      if (ev) {
        for (i = 0, len = ev.length; i < len; i++) {
          ev[i]();
        }
      }
    }

  };

  app.eventHandler = {

    init: function() {

      for(var handle in this) {
        if (handle !== 'init') {
          app.events.on(handle, event[handle]);
          console.log('init:', handle);
        }
      }

    }

  };


})(SnakeGame);