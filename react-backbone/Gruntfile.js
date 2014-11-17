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
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      }
    },
    connect: {
      server: {
        options: {
          base: '.',
          port: 9001,
        }
      }
    },
    wiredep: {
      task: {
        src: [
          'index.html'
        ],
        options: {
          'exclude' : [/modernizr/]
        }
      }
    }
  });

  grunt.registerTask('default', ['connect', 'wiredep', 'watch']);
};
