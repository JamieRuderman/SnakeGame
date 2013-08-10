var Snake = Snake || {};

(function(app){

  app.aiSearch = {

    // finder: new PF.AStarFinder(),
    finder: new PF.BestFirstFinder({
      heuristic: PF.Heuristic.manhattan
    }),
    pathIndex: 0,
    path: [],

    search: function() {
      var point, nextPos = this.followPath();

      // is next pos bad
      if (!nextPos || this.positionOccupied(nextPos)) {

        // Path find a way to the point
        point = app.points.getClosest();
        this.path = this.findPath(this.position, point, app.grid.matrix());
        nextPos = this.followPath();
      }

      if (!nextPos || this.positionOccupied(nextPos)) {
        // this.deathCheck();
        return false;
      }
      else {
        return nextPos;
      }
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
    },

    positionOccupied: function(p) {
      var cell = app.grid.get(p);
      return cell && cell != 'points';
/*
    },
    deathCheck: function() {
      if (!findAdjacent(self.position)) {
        self.die();
      }
    },

    // Finds random free adjacent cell to move to
    findAdjacent: function(p) {
      var adj = app.shuffle(adjacent(p));
          result = false;

      for (var i = adj.length; i--;) {
        cell = app.grid.get(adj[i]);
        if (!cell || cell == 'points') {
          result = adj[i];
          break;
        }
      }

      return result;
    },

    // get valid adjecent cell list
    adjacent: function(p) {
      var adj = [
        [p[0], p[1] -1], // top
        [p[0] +1, p[1]], // right
        [p[0], p[1] +1], // bottom
        [p[0] -1, p[1]]  // left
      ];
      return adj;
*/
    }

  };

})(Snake);