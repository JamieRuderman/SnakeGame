(function(app){

  /*
    Global event handling
  */
  app.input = {

    events: {},

    init: function() {
      $(window).on('keydown', function(event) {
        app.events.trigger('keydown', event);
      });

      $(window).on('keyup', function(event) {
        app.events.trigger('keyup', event);
      });
    }

  };

})(Snake || {});