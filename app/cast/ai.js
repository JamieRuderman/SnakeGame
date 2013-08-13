var Snake = Snake || {};

(function(app){

  app.ai = {

    aiMode: 'wander', // search || wander
    awareness: 0.5,   // % of stage that is close by

    aiAdvance: function(noSwitch) {
      var result;

      switch (this.aiMode) {
        case 'search':
          result = this.search();
          if (result) {
            this.position = result;
          }
          else if (!noSwitch) {
            this.aiSet('wander');
            this.aiAdvance(true);
          }
          break;
        case 'wander':
          result = this.wander(this.position);
          if (!result && !noSwitch && this.closeBy()) {
            this.aiSet('search');
            this.aiAdvance(true);
          }
          break;
      }
    },

    aiSet: function(mode) {
      // clear the current path to trigger a new one
      this.path = [];
      this.resetDirections();
      this.aiMode = mode;
    },

    closeBy: function() {
      if (this.position) {
        var stage = (app.state.stageSize[0] + app.state.stageSize[1]) / 2,
            close = stage * this.awareness,
            point = app.points.getClosest(),
            distance = this.distance(this.position, point);
        return close > distance;
      }
    },

    // Euclidean distance calculation
    distance: function(a, b) {
      var x = a[0] - b[0],
          y = a[1] - b[1];
      return Math.sqrt(x * x + y * y);
    }

  };

})(Snake);
