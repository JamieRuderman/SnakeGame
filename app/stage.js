var SnakeGame = SnakeGame || {};

(function(app){

  app.Stage = function() {

    var self = {
      // width, height in blocks
      size: app.state.stageSize
    };

    var body = $('body'),
        scale = app.state.scale;

    self.init = function() {
      self.el = $('.stage');
      self.el.attr({
        width: (self.size[0] * scale) + 'px',
        height: (self.size[1] * scale) + 'px'
      });
      self.context = self.el[0].getContext('2d');
      self.position();
    };

    self.position = function() {
      var el = $('.game');
      el.css({
        'margin-left': (el.width() / 2 * -1) + 'px',
        'margin-top': (el.height() / 2 * -1) + 'px'
      });
    };

    self.init();

    return self;
  };

})(SnakeGame);
