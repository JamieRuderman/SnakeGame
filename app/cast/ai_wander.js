var Snake = Snake || {};

(function(app){

  app.aiWander = {

    directions: ['left', 'right', 'up', 'down'],
    direction: null,
    worried: false, // worrying triggers wanting different ai mode

    wander: function(from, turn) {
      var position = !!from && from.slice(),
          newDirection = this.direction,
          seed = Math.random(),
          change, cell, point;

      if (!position) {
        position = app.hit.randomFree();
      }

      if (seed > this.turnChance || turn) {
        change = this.pickDirection();
        newDirection = app.hit.noReverse(newDirection, change);
      }

      position = app.hit.move(newDirection, position);
      cell = app.grid.get(position);

      // avoid occupied
      if (cell && cell != 'points') {
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
        this.direction = newDirection;
        this.addSegment();
        this.resetDirections();
        return true;
      }
    },

    noMoves: function() {
      return this.directions.length === 0;
    },

    pickDirection: function() {
      var seed = Math.random(),
          available = this.directions.length,
          index = Math.ceil(seed * available) -1,
          pick = null;

      if (index >= 0) {
        pick = this.directions[index];
        this.directions.splice(index, 1);
      }

      return pick;
    },

    resetDirections: function() {
      this.directions = ['left', 'right', 'up', 'down'];
    }

  };

})(Snake);