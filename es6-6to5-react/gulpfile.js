var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var to5ify = require('6to5ify');
var watchify = require('watchify');

var browserifyOptions = {
  debug: true,
  extensions: ['.jsx', '.js'],
  cache: {}, packageCache: {}, fullPaths: true
};

var bundler = watchify(browserify('./js/app.jsx', browserifyOptions));
bundler.transform(to5ify);

gulp.task('watch', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler


function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}
