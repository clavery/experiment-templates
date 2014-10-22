'use strict';
module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    watch: {
      html: {
        files: ['*.html', 'js/**/*.js'],
        tasks: [],
        options: {
          livereload: 35720,
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '.',
          port: 9001,
        }
      }
    }
  });

  grunt.registerTask('default', ['connect', 'watch']);
};
