(function(app){

  app.start = (function() {

    var self = {};

    self.init = function() {
      app.state.init();
      app.menu.init();
      app.audio.init();
    };

    self.newgame = function() {
      // start player game
      app.points     = new app.Points();
      app.stage      = new app.Stage();
      app.grid       = new app.Grid();

      // TODO: cast can contain all members of all types

      if (app.state.border) {
        app.border   = new app.Border();
      }
      app.obstacles  = new app.Cast({
        member: app.Obstacle,
        length: app.state.obstacles
      });
      app.bots       = new app.Cast({
        member: app.Bot,
        length: app.state.bots
      });

      app.player     = new app.Player();
      app.display    = new app.Display();
      app.renderer   = new app.Renderer();
      app.timer      = new app.Timer();
      app.controller = new app.Controller();

      app.events.trigger('ready');
    };

    $(document).ready(function() {
      self.init();
    });

    return self;

  })();

})(Snake || {});
