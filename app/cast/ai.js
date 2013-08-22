var Snake = Snake || {};

(function(app){

  app.ai = {

    aiMode: 'wander', // search || wander
    awareness: 0.25,   // % of stage that is close by

    /* Returns the next position as calculated by the current ai mode */
    aiAdvance: function(position) {
      var result;

      switch (this.aiMode) {
        case 'search':
          result = this.search(position);
          if (result.success) {
            return result.position;
          }
          else {
            // can't find something to search for try to wander
            this.aiSet('wander');
            return this.aiAdvance(position);
          }
          break;

        case 'wander':
          result = this.wander(position);
          if (result.success) {
            if (result.worried && this.closeBy(position)) {
              console.log('worried');
              this.aiSet('search');
              return this.aiAdvance(position);
            }
            else {
              return result.position;
            }
          }
          else {
            // can't wander means no possible moves
            this.hit();
            return result.position;
          }
          break;
      }
    },

    aiSet: function(mode) {
      // clear the current path to trigger a new one
      this.path = [];
      this.aiMode = mode;
    },

    closeBy: function(position) {
      if (position) {
        var stage = (app.state.stageSize[0] + app.state.stageSize[1]) / 2,
            close = stage * this.awareness,
            point = app.points.getClosest(),
            distance = this.distance(position, point);
        return close > distance;
      }
    },

    // Euclidean distance calculation
    distance: function(a, b) {
      var x = a[0] - b[0],
          y = a[1] - b[1];
      return Math.sqrt(x * x + y * y);
    },

    checkHit: function(position) {
      var adjacent = app.grid.adjacent(position);
      if (adjacent.length === 0) this.hit();
    }

  };

})(Snake);
