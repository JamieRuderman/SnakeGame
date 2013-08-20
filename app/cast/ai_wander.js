var Snake = Snake || {};

(function(app){

  app.aiWander = {

    turnChance: 0.9,
    worried: false,

    /* Return value indicates if the ai is worried and wants a new mode */
    wander: function(from, turn, worried) {
      var position = !!from && from.slice(),
          seed = Math.random(),
          change, occupied, point;

      if (!position) {
        position = app.hit.randomFree();
      }

      if (seed > this.turnChance || turn) {
        position[2] = this.pickDirection(position[2]);
      }

      position = app.hit.move(position);
      occupied = app.grid.occupied(position);

      // avoid occupied
      if (occupied) {
        if (this.noMoves()) {
          this.die();
        } else {
          worried = (this.directions.length < 4) ? true : worried; // worried if direction options are running out
          this.wander(this.position, true, worried); // recursion - stay wandering
          return worried;
        }
      }
      // move
      else {
        this.position = position;
        this.resetDirections();
        return worried;
      }
    },

    noMoves: function() {
      return this.directions.length === 0;
    },

    pickDirection: function(moving) {
      var seed = Math.random(),
          available = this.directions.length,
          index = Math.ceil(seed * available) -1,
          pick = 'none';

      if (index >= 0) {
        pick = this.directions[index];
        this.directions.splice(index, 1);
      }

      return app.hit.noReverse(moving, pick);
    },

    resetDirections: function() {
      this.directions = app.state.directions.slice();
    }

  };

})(Snake);