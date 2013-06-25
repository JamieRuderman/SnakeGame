var SnakeGame = SnakeGame || {};

(function(app){

  /*
    events: {
      'render': [
        draw callback,
        player callback
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

    trigger: function(name, args) {
      var ev = this.events[name];
      if (ev) {
        for (i = 0, len = ev.length; i < len; i++) {
          ev[i](args);
        }
      }
    }

  };

  /*
    Auto bind event callbacks by handle.callbackname
  */
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

  /*
    Object event callback mixin
  */
  app.eventTriggers = {

    trigger: function(name, args) {
      // Maps 'onCallback' to 'callback' function
      var callback = 'on' + name.charAt(0).toUpperCase() + name.slice(1);
      if (typeof this[callback] == 'function') {
        this[callback].apply(this, args);
      }
    }

  };


})(SnakeGame);