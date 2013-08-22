var Snake = Snake || {};

(function(app){

  app.aiWander = {

    turnChance: 0.9,
    worryChance: 0.5, // worrying all the time can put in situations of infinite loops

    /*
      Wanders forward, avoiding obsticles
        @return obj {
          position (array) position - unchanged if no path can be found
          worried  (bool)  if the ai is worried and wants a new mode
        }
    */
    wander: function(position) {
      position = position || app.hit.randomFree();

      var nextPos = position.slice(),
          seed = Math.random(),
          worried = false,
          success = true;

      nextPos = app.hit.advance(nextPos);

      if (seed > this.turnChance || app.grid.isSolid(nextPos)) {
        nextPos = this.pickAadjacent(position);
        worried = seed > this.worryChance;
      }

      // avoid occupied
      if (!nextPos) {
        success = false;
        nextPos = position;
      }

      // move
      return { worried: worried, position: nextPos, success: success };
    },

    pickAadjacent: function(position) {
      var seed = Math.random(),
          available = app.grid.adjacent(position),
          index = Math.ceil(seed * available.length) -1;
      return available[index];
    }

  };

})(Snake);