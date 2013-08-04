(function(app){

  app.start = (function() {

    var self = {};

    self.init = function() {
      app.state.init();
      app.menu.init();
      app.audio.init();
    };

    self.newgame = function() {
      app.stage = new app.Stage();
      app.grid = new app.Grid();
      app.points = new app.Point();

      app.cast = new app.Cast([
        'borders',
        'players',
        'obstacles',
        'bots'
      ]);

      app.display = new app.Display();
      app.renderer = new app.Renderer();
      app.timer = new app.Timer();
      app.controller = new app.Controller();

      app.events.trigger('ready');
    };

    $(document).ready(function() {
      self.init();
    });

    return self;

  })();

})(Snake || {});
