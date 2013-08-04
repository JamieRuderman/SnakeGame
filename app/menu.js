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
        select = {},
        paused;

    self.init = function() {
      menus = {
        begin: $('.begin'),
        gameover: $('.gameover'),
        pause: $('.pause')
      };
      show('begin');
      app.events.register(handle);
    };

    /* Private -------------- */

    handle.gameover = function() {
      show('gameover');
    };

    handle.pause = function() {
      if (paused) {
        paused = false;
        hide('pause');
      }
      else {
        paused = true;
        show('pause');
      }
    };

    select.begin = function(event) {
      hide('begin');
      app.state.set(event.target.name);
      app.start.newgame();
    };

    select.gameover = function(event) {
      hide('gameover');
      if (event.target.name == 'restart') {
        app.events.trigger('reset');
      }
      else if (event.target.name == 'menu') {
        show('begin');
      }
    };

    select.pause = function(event) {
      if (event.target.name == 'resume') {
        app.events.trigger('pause');
      }
      else if (event.target.name == 'quit') {
        hide('pause');
        app.events.trigger('gameover');
      }
    };

    function show(menu) {
      menus[menu].show();
      menus[menu].on('click', '.select', select[menu]);
    }

    function hide(menu) {
      menus[menu].hide();
      menus[menu].off('click', '.select', select[menu]);
    }

    return self;

  })();

})(Snake);
