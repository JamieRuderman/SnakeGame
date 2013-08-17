var Snake = Snake || {};

(function(app){

  app.digitizer = {

    context: null,
    cache: {},
    images: {
      'map': null
    },

    init: function() {
      var canvas = document.createElement('canvas');
      this.context = canvas.getContext('2d');
      this.images['map'] = this.load('map');
    },

    load: function(name) {
      if (this.cache[name]) return this.cache[name];

      var img = document.createElement('img');
      img.src = './map/'+ name +'.gif';

      this.cache[name] = img;
      return img;
    },

    getImg: function(name) {
      var img = this.images[name];
      this.context.drawImage(img, 0, 0);
      return this.context.getImageData(0, 0, img.width, img.height);
    },

    map: function(name) {
      var array = [],
          img = this.getImg(name),
          index = 0;

      for (var y = 0; y < img.width; y++) {
        array[y] = [];
        for (var x = 0; x < img.height; x++) {
          if (img.data[index] === 0) array[y][x] = ['none', 'borders'];
          index += 4;
        }
      }

      return array;
    }

  };

})(Snake);
