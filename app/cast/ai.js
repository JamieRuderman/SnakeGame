var Snake = Snake || {};

(function(app){

// @TODO = implement a fully rendered grid to search on and render from.

  app.ai = {

    path: [],

    counter: 0,

    init: function(p) {
      this.counter = 0;
      this.path = [[p[0], p[1], this.counter]];
    },

    // finds the shortest path from end back to start
    find: function(start, end) {
      var adj, loop = true;

      this.init(end);
      // add positions to path (path will grow as it explores)
      while (this.counter < this.path.length && loop) {
        this.counter++;
        for (var j = this.path.length; j--;) {
          adj = this.adjacent(this.path[j], this.counter);

          // remove invalid positions and look for start
          for (var i = adj.length; i--;) {
            if (!this.invalid(adj[i])) this.path.push(adj[i]);
            if (adj[i][0] == start[0] && adj[i][1] == start[1]) {
              loop = false;
            }
            if (!loop) break;
          }
          if (!loop) break;
        }
        console.log('length', this.path.length);
      }
      console.log('done', this.path);

      return this.path;
    },

    // get valid adjecent cell list
    adjacent: function(p, c) {
      var adj = [
        [p[0], p[1] -1, c], // top
        [p[0] +1, p[1], c], // right
        [p[0], p[1] +1, c], // bottom
        [p[0] -1, p[1], c]  // left
      ];
      return adj;
    },

    // position is unoccupied
    invalid: function(p) {
      return app.grid.occupied(p) || this.exists(p);
    },

    // position exists in the path with a lower or equal counter
    exists: function(p) {
      for (var i = this.path.length; i--;) {
        if (this.path[i][0] == p[0] && this.path[i][1] == p[1] && this.path[i][2] <= p[2]) {
          return true;
        }
      }
      return false;
    },

    // manhattan heuristic (http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html)
    heuristic: function(pos0, pos1) {
      var d1 = Math.abs (pos1.x - pos0.x);
      var d2 = Math.abs (pos1.y - pos0.y);
      return d1 + d2;
    },

    search: function(start, end) {
      var open = [start]; // list

      // while (open.length > 0) {
      //   current =
      // }
    }


// PATHFINDING

  // push startNode onto openList
  // while(openList is not empty) {
  //   currentNode = pop from openList
  //   if currentNode is final, return the successful path
  //   set currentNode as closed
  //   foreach neighbor of currentNode {
  //      if neighbor is not set visited {
  //       // g == guess, f == fact, h == huristic
  //             save g, h, and f then save the current parent and set visited
  //             add neighbor to openList
  //      }
  //      if neighbor is in openList but the current g is better than previous g {
  //              save g and f, then save the current parent
  //              reset position in openList (since f changed)
  //      }
  //   }
  // }

// Create a list of the four adjacent cells, with a counter variable of the current element's counter variable + 1
// Check all cells in each list for the following two conditions:
//     If the cell is a wall, remove it from the list
//     If there is an element in the main list with the same coordinate and an equal or lower counter, remove it from the list
// Add all remaining cells in the list to the end of the main list
// Go to the next item in the list


  };

})(Snake);