'use strict';
module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    watch: {
      sass: {
        files: ['*.html', 'foobar/static/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: 35720,
        }
      },
      code: {
        files: ['*.html', 'foobar/static/js/**/*.js'],
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
    sass: {
      options: {
        sourceMap: true,
        includePaths: [
          'foobar/static/vendor/bootstrap-sass-official/assets/stylesheets/'
        ]
      },
      dist: {
        files: {
          'foobar/static/css/screen.css': 'foobar/static/sass/screen.scss'
        }
      }
    },
    wiredep: {
      task: {
        src: [
          'foobar/templates/deps.html'
        ],
        options: {
          exclude: [/modernizr/],
          ignorePath: '../static/',
          fileTypes: {
            html: {
              replace: {
                js: '<script src="\{\{url_for(\'static\', filename=\'{{filePath}}\')\}\}"></script>',
              }
            }
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['wiredep', 'watch']);
};
