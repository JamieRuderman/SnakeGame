(function(app) {

  app.Grid = function() {

    var self = {},
        grid = [[]]; // two dimensional array

    /* Add position to grid */
    self.add = function(x, y, options) {
      if (grid[y] === undefined) grid[y] = [];
      grid[y][x] = options;
    };

    /* Add cast member positions to grid */
    self.make = function() {
      var first, prev, curr;

      grid = app.digitizer.map('map').slice(); // FIXME: slice here seems icky

      app.cast.each(function(member) {
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
          curr.obj = member;

          self.add(p[0], p[1], curr);

          prev = curr;
        });

        // tail
        // if (curr) {
        //   curr.from = 'tail';
        //   self.add(p[0], p[1], curr);
        // }
      });

      app.props.each(function(item) {
        item.each(function(p) {
          self.add(p[0], p[1], {
            from: 'tail',
            to: 'head',
            type: item.type,
            obj: item
          });
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

    /* Position or cell is bad */
    self.isOccupied = function(p) {
      return grid[p[1]] && grid[p[1]][p[0]];
    };

    /* Cell can be passed through */
    self.isSolid = function(p) {
      return self.isOccupied(p) &&
            (grid[p[1]][p[0]].type != 'points' && grid[p[1]][p[0]].type != 'powerups');
    };

    // get unoccupied adjacent position list
    self.adjacent = function(p) {
      // debugger;
      var adj = [
        [p[0], p[1] -1, 'up'],
        [p[0] +1, p[1], 'right'],
        [p[0], p[1] +1, 'down'],
        [p[0] -1, p[1], 'left']
      ];
      for (var i = adj.length; i--;) {
        if (self.isSolid(adj[i]) || app.hit.isReverse(p[2], adj[i][2])) {
          adj.splice(i, 1);
        }
      }
      return adj;
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
          matrix[y][x] = self.isSolid([x, y]) ? 1 : 0;
        }
        // console.log(matrix[y]);
      }
      return matrix;
    };

    return self;

  };

})(Snake || {});