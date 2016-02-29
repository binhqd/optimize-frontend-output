'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('concatAssets', function() {
  var myConfig = require('../config.json');
  var envConfig = myConfig[process.env.NODE_ENV];
  
  return gulp.src([paths.src + 'index.html', paths.src + '404.html', paths.src + 'maintenance.html'], {base: paths.src})
    .pipe(usemin({
      css: [ minifyCss, rev ],
      js: [ ngAnnotate, uglify, rev ],
      assetsDirs: [paths.dist, paths.dist + 'images']
    }))
    .pipe(gulp.dest(paths.dist));
});