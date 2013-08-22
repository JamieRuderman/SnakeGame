var Snake = Snake || {};

(function(app){

  app.aiSearch = {

    // finder: new PF.AStarFinder({
    //   heuristic: PF.Heuristic.manhattan
    // }),
    finder: new PF.BestFirstFinder({
      heuristic: PF.Heuristic.manhattan
    }),
    pathIndex: 0,
    path: [],

    /*
      Finds a path to the closest point
        @return position - unchanged if no path is found
    */
    search: function(position) {
      var point,
          success = true,
          nextPos = this.followPath();

      // is next pos bad
      if (!nextPos || app.grid.isSolid(nextPos)) {

        // Path find a way to the point
        point = app.points.getClosest();
        this.path = this.findPath(position, point, app.grid.matrix());
        nextPos = this.followPath();
      }

      // move, or return false
      if (!nextPos) {
        success = false;
        nextPos = position;
      }
      else {
        nextPos = app.hit.addDirection(position, nextPos);
      }

      return { position: nextPos, success: success };
    },

    /* Uses https://github.com/qiao/PathFinding.js */
    findPath: function(start, end, matrix) {
      var size = app.state.stageSize, grid;
      start = start || app.hit.randomFree();

      // clear start and end points so we can pathfind!
      matrix[start[1]][start[0]] = matrix[end[1]][end[0]] = 0;

      grid = new PF.Grid(size[0], size[1], matrix);
      this.pathIndex = 1; // 1 to not include current position
      return this.finder.findPath(start[0], start[1], end[0], end[1], grid);
    },

    followPath: function() {
      return this.path[this.pathIndex++];
    },

    eachPath: function(callback) {
      for (var i = 0, len = this.path.length; i < len; i++) {
        callback(this.path[i]);
      }
    }

  };

})(Snake);