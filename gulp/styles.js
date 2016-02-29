'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(cb) {
  return gulp.src('./src/*.scss')
  .pipe(compass({
    css : paths.tmp + 'styles',
    sass : 'styles',
    image : '.tmp/images/generated',
    import_path : 'bower_components',
    font : 'styles/fonts',
    javascript : 'scripts',
    generated_images_path : '.tmp/images/generated',
    relative : true
  }))
  
  .pipe(autoprefixer({
    browsers : [ '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1' ],
    cascade : false
  }))
  .pipe(gulp.dest(paths.src + '/styles/'));
});
