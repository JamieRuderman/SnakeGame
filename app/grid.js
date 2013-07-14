(function(app) {

  app.Grid = function() {

    var self = {},
        grid = [[]]; // two dimensional array
        cast = [
          'obstacles',
          'bots',
          'player',
          'points',
          'border'
        ];

    /* Add cast member positions to grid */
    self.make = function() {
      grid = [];
      for (var i = cast.length; i--;) {
        if (app[cast[i]]) app[cast[i]].each(function(position) {
          add(position, cast[i]);
        });
      }
    };

    self.each = function(callback) {
      for (var i = 0; i < app.state.stageSize[0]; i++) {
        for (var ii = 0; ii < app.state.stageSize[1]; ii++) {
          if (grid[i] && grid[i][ii]) callback(grid[i][ii], [i, ii]);
        }
      }
    };

    self.get = function() {
      return grid;
    };

    /* Add position to grid */
    function add(p, type) {
      if (grid[p[0]] == undefined) grid[p[0]] = [];
      grid[p[0]][p[1]] = type;
    }

    return self;

  };

})(SnakeGame || {});