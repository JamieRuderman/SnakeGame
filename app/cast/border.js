var Snake = Snake || {};

(function(app){

  app.Border = function() {

    var self = new app.Member();

    self.type = 'borders';

    self.create = function() {
      var size = app.state.stageSize;

      for (var x = 0; x < size[0]; x++) {
        for (var y = 0; y < size[1]; y++) {
          if (x === 0 || y === 0 || x == size[0]-1 || y == size[1]-1) {
            self.segments.push([x, y]);
          }
        }
      }

      self.length = self.segments.length;
    };

    self.init();

    return self;
  };

})(Snake);