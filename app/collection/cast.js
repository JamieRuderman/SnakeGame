(function(app){

  /*
    Cast collection
      @param options {
        member: Member class object added to the cast,
        length: Number of objects to be added to the collection
      }
  */
  app.Cast = function(options) {

    var self = new app.Collection(options);

    function init() {
      for (var i = 0; i < options.length; i++) {
        cast(options[i]);
      }
    }

    /* Add members to cast and provide global name */
    function cast(type) {
      var members = [],
          count = app.state[type],
          constructor;

      for (var c = 0; c < count; c++) {
        constructor = type.caps().single();
        members.push(new app[constructor]({
          id: ++self.serial,
          onDeath: self.remove
        }));
      }

      // add to the cast
      self.array = self.array.concat(members);

      // assign global name shortcuts
      app[type] = members;
      app[type].collection = function(callback) {
        self.select(type, callback);
      };

    }

    init();

    return self;

  };

})(Snake || {});