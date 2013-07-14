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
      var ev = events[name];
      if (typeof callback == 'function') {
        events[name] = ev || [];
        events[name].push(callback);
      }
    },

    off: function(name, callback) {
      var ev = events[name];
      if (callback && ev) ev.splice(ev.indexOf(callback), 1);
      if (!callback || ev.length === 0) delete events[name];
    },

    trigger: function(name) {
      var ev = events[name],
          args = Array.prototype.slice.call(arguments, 1);
      if (ev) {
        for (i = 0, len = ev.length; i < len; i++) {
          ev[i].apply(ev, args);
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


})(SnakeGame || {});