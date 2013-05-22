var SnakeGame = SnakeGame || {};

(function(app){

  app.Stage = function() {

    var self = {
      // width, height in blocks
      size: [40, 40],
      el: $('<canvas />')
    };

    var body = $('body'),
        scale = app.config.scale;

    self.init = function() {
      body.append(self.el);
      self.el.addClass('stage');
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
