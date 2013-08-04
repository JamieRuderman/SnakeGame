(function(app) {

  app.Grid = function() {

    var self = {},
        grid = [[]]; // two dimensional array

    /* Add cast member positions to grid */
    self.make = function() {
      grid = [];

      app.cast.collection(function(member) {
        member.each(function(p) {
          add(p, member.type);
        });
      });

      // FIXME: points should be part of cast
      app.points.each(function(p) {
        add(p, app.points.type);
      });
    };

    self.each = function(callback) {
      for (var i = 0; i < app.state.stageSize[0]; i++) {
        for (var ii = 0; ii < app.state.stageSize[1]; ii++) {
          if (grid[i] && grid[i][ii]) callback(grid[i][ii], [i, ii]);
        }
      }
    };

    // TODO: combine get and occupied?
    self.get = function() {
      return grid;
    };

    self.occupied = function(p) {
      return grid[p[0]] && grid[p[0]][p[1]] || false;
    };

    /* Add position to grid */
    function add(p, type) {
      if (grid[p[0]] == undefined) grid[p[0]] = [];
      grid[p[0]][p[1]] = type;
    }

    function remove(p, type) {
      // remove from grid
    }

    return self;

  };

})(Snake || {});