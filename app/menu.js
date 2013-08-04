var Snake = Snake || {};

/*
  game modes ideas
    adventure - explore and find items
    survival - see how long you can get
    tiny - slow step based
    combat - with computer or 2 player
    surround?
    obstacles
    shooting

    clear levels. to advance.
*/

(function(app){

  app.menu = (function() {

    var self = {},
        handle = {},
        menus = {},
        paused;

    self.init = function() {
      menus.begin = $('.begin');
      menus.gameover = $('.gameover');
      menus.pause = $('.pause');
      self.begin();
      app.events.register(handle);
    };

    // show start menu
    self.begin = function() {
      menus.begin.show();
      eventsOn();
    };

    // show gameover menu
    handle.gameover = function() {
      menus.gameover.show();
      eventsOn();
    };

    handle.pause = function() {
      if (paused) {
        paused = false;
        menus.pause.hide();
        eventsOff();
      }
      else {
        paused = true;
        menus.pause.show();
        eventsOn();
      }
    };

    /* Private -------------- */

    function beginSelect(event) {
      menus.begin.hide();
      eventsOff();
      app.state.set(event.target.name);
      app.start.newgame();
    }

    function gameoverSelect(event) {
      menus.gameover.hide();
      eventsOff();
      if (event.target.name == 'restart') {
        app.events.trigger('reset');
      }
      else if (event.target.name == 'menu') {
        self.begin();
      }
    }

    function pauseSelect(event) {
      if (event.target.name == 'resume') {
        app.events.trigger('pause');
      }
      else if (event.target.name == 'quit') {
        menus.pause.hide();
        app.events.trigger('gameover');
      }
    }

    function eventsOn() {
      menus.begin.on('click', '.select', beginSelect);
      menus.gameover.on('click', '.select', gameoverSelect);
      menus.pause.on('click', '.select', pauseSelect);
    }

    function eventsOff() {
      menus.begin.off('click', '.select', beginSelect);
      menus.gameover.off('click', '.select', gameoverSelect);
      menus.pause.off('click', '.select', pauseSelect);
    }

    return self;

  })();

})(Snake);
