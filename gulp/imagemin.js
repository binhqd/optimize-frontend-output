'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

gulp.task('imagemin', function() {
  return gulp.src(paths.src + '/images/**/*.{png,jpg,jpeg,gif,svg}')
  .pipe(imagemin({
    progressive : true,
    svgoPlugins : [ {
      removeViewBox : false
    } ],
    use : [ pngquant() ]
  }))
  .pipe(rev())
  .pipe(gulp.dest(paths.dist + '/images'))
  .pipe(rev.manifest('rev-manifest.json', {
    
  }))
  .pipe(gulp.dest(paths.tmp + 'images'))
  ;
});