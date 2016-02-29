'use strict';

var gulp = require('gulp');

var paths = gulp.paths;
var cdnify = require('gulp-cdnify');
var gcallback = require('gulp-callback');
var revReplace = require('gulp-rev-replace');
var htmlmin = require('gulp-htmlmin');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('clean', function (done) {
  $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('rev:css', function() {
  var manifest = gulp.src([paths.tmp + 'images/rev-manifest.json']);
  
  return gulp.src([paths.dist + 'styles/**/*.css'], {base: paths.dist})
  .pipe(revReplace({manifest: manifest}))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('rev-final', function() {
  var manifest = gulp.src([paths.tmp + 'images/rev-manifest.json', paths.tmp + 'templates/rev-manifest.json']);
  var myConfig = require('../config.json');
  var envConfig = myConfig[process.env.NODE_ENV];
  
  return gulp.src([paths.dist + 'index.html', paths.dist + '404.html', paths.dist + 'maintenance.html'], {base: paths.dist})
  .pipe(revReplace({manifest: manifest}))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(cdnify({
    base: envConfig.ENV.staticUrl,
    html: {
      'img[src]': 'src',
      'link[rel]': 'href',
      'script[src]': 'src',
      'video[poster]': 'poster',
      'source[src]': 'src'
    }
  }))
  .pipe(gulp.dest(paths.dist));
});

// gulp.task('buildapp', ['config', 'html', 'images', 'fonts', 'misc']);
gulp.task('buildapp', ['copy:dist'], function() {
  return gulp.start(['styles', 'template-cache'], function() {
    return gulp.start('concatAssets', function() {
      return gulp.start('rev:css', function() {
        return gulp.start('rev-final', function() {
          return gulp.start('compress:dist', function() {
            this.emit('end');
          });
        });
      });
      
      
    });
  });
});