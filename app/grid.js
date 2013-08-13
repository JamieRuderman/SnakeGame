(function(app) {

  app.Grid = function() {

    var self = {},
        grid = [[]]; // two dimensional array

    /* Add cast member positions to grid */
    self.make = function() {
      grid = app.digitizer.map('map').slice();

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
      for (var y in grid) {
        for (var x in grid[y]) {
          callback(grid[y][x], [x, y]);
        }
      }
    };

    self.get = function(p) {
      if (!p)
        return grid;
      else
        return grid[p[1]] && grid[p[1]][p[0]] || false;
    };

    self.length = function() {
      var length = 0;
      self.each(function() {
        length++;
      });
      return length;
    };

    /* build y, x matrix for pathfinding */
    self.matrix = function() {
      var matrix = [];
      for (var y = 0; y < app.state.stageSize[1]; y++) {
        matrix[y] = [];
        for (var x = 0; x < app.state.stageSize[0]; x++) {
          matrix[y][x] = self.get([x, y]) ? 1 : 0;
        }
        // console.log(matrix[y]);
      }
      return matrix;
    };

    /* Add position to grid */
    function add(p, type) {
      if (grid[p[1]] == undefined) grid[p[1]] = [];
      grid[p[1]][p[0]] = type;
    }

    function remove(p, type) {
      // remove from grid
    }

    return self;

  };

})(Snake || {});