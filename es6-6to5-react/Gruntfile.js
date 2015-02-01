
module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var to5ify = require("6to5ify");

  grunt.initConfig({
    watch: {
      js: {
        files: ['dist/app.js'],
        tasks: []
      },
      options: {
        livereload: 35721
      }
    },
    browserify: {
      dev: {
        files: {
          'dist/app.js': ['js/**/*.{jsx,js}'],
        },
        options: {
          browserifyOptions: {
            debug: true, // sourcemaps
            extensions: ['.jsx', '.js'] // consider jsx files as modules
          },
          watch: true,
          transform: [to5ify]
        }
      }
    },
    connect: { 
      all: {
        options: {
          base: "."
        }
      }
    }
  });

  grunt.registerTask("default", ["connect", "browserify", "watch"]);
};
