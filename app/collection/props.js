(function(app){

  /*
    Cast collection
      @param options {
        member: Member class object added to the cast,
        length: Number of objects to be added to the collection
      }
  */
  app.Props = function(options) {

    var self = new app.Collection(options);

    function init() {
      for (var i = 0; i < options.length; i++) {
        cast(options[i]);
      }
    }

    /* Add items to cast and provide global name */
    function cast(type) {
      var constructor = type.caps(),
          prop = new app[constructor]({
            id: ++self.serial,
            onDeath: self.remove
          });

      // add to the cast
      self.array = self.array.concat(prop);

      // assign global name shortcuts
      app[type] = prop;

    }

    init();

    return self;

  };

})(Snake || {});