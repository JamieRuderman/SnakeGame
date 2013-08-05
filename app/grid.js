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
      for (var x in grid) {
        for (var y in grid[x]) {
          callback(grid[x][y], [x, y]);
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

    self.length = function() {
      var length = 0;
      self.each(function() {
        length++;
      });
      return length;
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