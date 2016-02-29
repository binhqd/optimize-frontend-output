'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var gzip = require('gulp-gzip');

gulp.task('compress:dist', function() {
  return gulp.src([paths.dist + 'styles/**/*.css', paths.dist + 'scripts/**/*.js'], {base: paths.dist})
    .pipe(gzip({
      append: false
    }))
    .pipe(gulp.dest(paths.dist));
});