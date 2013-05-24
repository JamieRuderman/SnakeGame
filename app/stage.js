var SnakeGame = SnakeGame || {};

(function(app){

  app.Stage = function() {

    var self = {
      // width, height in blocks
      size: app.config.STAGE_SIZE
    };

    var body = $('body'),
        scale = app.config.scale;

    self.init = function() {
      self.el = $('.stage');
      self.el.attr({
        width: (self.size[0] * scale) + 'px',
        height: (self.size[1] * scale) + 'px'
      });
      self.context = self.el[0].getContext('2d');
    };

    self.init();

    return self;
  };

})(SnakeGame);
