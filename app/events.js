(function(app){

  /*
    Global event handling
  */
  app.events = {

    events: {},

    on: function(name, callback, tag) {
      var ev = this.events[name];
      if (typeof callback == 'function') {
        this.events[name] = ev || [];
        this.events[name].push({tag: tag || 'none', callback: callback});
      }
    },

    off: function(name, callback) {
      var ev = this.events[name];
      if (callback && ev) ev.splice(ev.indexOf(callback), 1);
      if (!callback || (ev && ev.length === 0)) delete this.events[name];
    },

    trigger: function(name) {
      var ev = this.events[name],
          args = Array.prototype.slice.call(arguments, 1);
      if (ev) {
        for (i = 0, len = ev.length; i < len; i++) {
          ev[i].callback.apply(ev, args);
        }
      }
    },

    register: function(handles, tag) {
      for (var handle in handles) {
        this.on(handle, handles[handle], tag);
      }
    },

    deregister: function(tag) {
      var ev = this.events;
      if (tag) {
        for (var name in this.events) {
          for (var i = ev[name].length; i--;) {
            if (ev[name][i].tag == tag) {
              ev[name].splice(i, 1);
            }
          }
        }
      }
      else {
        this.events = {};
      }
    },

    list: function() {
      var list = [];
      for (var key in this.events) {
        list.push(key);
      }
      return list;
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

  /*
    Auto bind global event callbacks by handle.callbackname
      Add to module:
        var handle = app.eventHandler;
        self.init = function() { handle.init() };
        handle.reset = function() { ... };
  */
  // app.eventHandler = {

  //   init: function() {
  //     for (var handle in this) {
  //       if (handle !== 'init') {
  //         app.events.on(handle, this[handle]);
  //         console.log('Event: handle.' + handle, this.self);
  //       }
  //     }
  //   }

  // };


})(Snake || {});