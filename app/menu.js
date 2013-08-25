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
        select = {};

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

    handle.reset = function() {
      paused = false;
    };

    handle.pause = function() {
      if (app.state.paused) {
        hide('pause');
      }
      else {
        show('pause');
      }
    };

    /* menu button selection handlers */

    select.begin = function(event) {
      var select = parse(event);

      switch (select[0]) {
        case 'set':
          app.state.set(select[1]);
          displayActive(event);
          break;
        case 'players':
          app.state.players = +select[1];
          displayActive(event);
          break;
        case 'start':
          hide('begin');
          app.start.newgame();
      }
      console.log('playsrs', app.state.players);
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
      setActiveState(menu);
      menus[menu].show();
      menus[menu].on('click', 'button', select[menu]);
    }

    function hide(menu) {
      menus[menu].hide();
      menus[menu].off('click', 'button', select[menu]);
    }

    /* applys the default active menu state */
    function setActiveState(menu) {
      var active = menus[menu].find('.active').each(function(index, element) {
        select[menu]({ target: element });
      });
    }

    function displayActive(event) {
      target = $(event.target);
      target.parents('ul').find('button').removeClass('active');
      target.addClass('active');
    }

    function parse(event) {
      return event.target.name.split(':');
    }

    return self;

  })();

})(Snake || {});
