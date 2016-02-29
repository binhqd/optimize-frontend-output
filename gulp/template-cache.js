'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();
var gulpCopy = require('gulp-copy');

var htmlmin = require('gulp-htmlmin');
var ngTemplates = require('gulp-ng-template');
var cdnify = require('gulp-cdnify');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var usemin = require('gulp-usemin');
var revReplace = require('gulp-rev-replace');

gulp.task('template-cache', ['imagemin'], function() {
  var manifest = gulp.src(paths.tmp + 'images/rev-manifest.json');
  var myConfig = require('../config.json');
  var envConfig = myConfig[process.env.NODE_ENV];

  return gulp.src(paths.src + 'views/**/*.html')
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
  .pipe(ngTemplates({
    filePath: 'templates.js',
    moduleName: 'ideapodApp',
    prefix: 'views/'
  }))
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest(paths.dist + 'scripts'))
  .pipe(rev.manifest('rev-template.json'))
  .pipe(gulp.dest(paths.tmp + 'templates'));
});
