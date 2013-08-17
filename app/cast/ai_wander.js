var Snake = Snake || {};

(function(app){

  app.aiWander = {

    directions: null,
    turnChance: 0.9,
    worried: false, // worrying triggers wanting different ai mode

    wander: function(from, turn) {
      var position = !!from && from.slice(),
          // newDirection = this.direction,
          seed = Math.random(),
          change, cell, point;

      if (!position) {
        position = app.hit.randomFree();
      }

      if (seed > this.turnChance || turn) {
        position[2] = this.pickDirection(position[2]);
      }

      position = app.hit.move(position);
      cell = app.grid.get(position);

      // avoid occupied
      if (cell && cell[1] != 'points') {
        if (this.noMoves()) {
          this.die();
        } else {
          if (this.directions.length < 4) this.worried = true;
          this.wander(this.position, true); // recursion - stay wandering
          return this.worried;
        }
      }
      // move
      else {
        this.worried = false;
        this.position = position;
        this.addSegment();
        this.resetDirections();
        return true;
      }
    },

    noMoves: function() {
      return this.directions.length === 0;
    },

    pickDirection: function(moving) {
      var seed = Math.random(),
          available = this.directions.length,
          index = Math.ceil(seed * available) -1,
          pick = null;

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