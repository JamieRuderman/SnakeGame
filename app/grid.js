(function(app) {

  app.Grid = function() {

    var self = {},
        grid = [[]]; // two dimensional array

    /* Add cast member positions to grid */
    self.make = function() {
      var first, prev, curr;

      grid = app.digitizer.map('map').slice(); // FIXME: slice here seems icky

      app.cast.collection(function(member) {
        first = true;

        member.each(function(p) {
          curr = {};

          // head
          if (first) {
            first = false;
            curr.to = 'head';
          } else {
            curr.to = app.hit.opposite(prev.from);
          }

          curr.from = app.hit.opposite(p[2]);
          curr.type = member.type;

          add(p[0], p[1], curr);

          prev = curr;
        });

        // tail
        // if (curr) {
        //   curr.from = 'tail';
        //   add(p[0], p[1], curr);
        // }
      });

      app.points.each(function(p) {
        add(p[0], p[1], {
          from: 'tail',
          to: 'head',
          type: app.points.type
        });
      });
    };

    /* Returns each cell as array [x, y, direction, type] */
    self.each = function(callback) {
      for (var y in grid) {
        for (var x in grid[y]) {
          callback(x, y, grid[y][x]);
        }
      }
    };

    self.get = function(p) {
      if (!p)
        return grid;
      else
        return grid[p[1]] && grid[p[1]][p[0]] || false;
    };

    self.occupied = function(p) {
      return grid[p[1]] && grid[p[1]][p[0]] && grid[p[1]][p[0]].type != 'points' || false;
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
          matrix[y][x] = self.occupied([x, y]) ? 1 : 0;
        }
        // console.log(matrix[y]);
      }
      return matrix;
    };

    /* Add position to grid */
    function add(x, y, options) {
      // console.log(x,y,options);
      if (grid[y] === undefined) grid[y] = [];
      grid[y][x] = options;
    }

    return self;

  };

})(Snake || {});