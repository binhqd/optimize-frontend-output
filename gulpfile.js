'use strict';

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');

gulp.paths = {
  src : './',
  dist : './dist/',
  tmp : '.tmp/',
  e2e : 'e2e/'
};

require('require-dir')('./gulp');

gulp.task('build', [ 'clean', 'config' ], function() {
  gulp.start('buildapp');
});

gulp.task('config', function() {
  var myConfig = require('./config.json');
  var envConfig = myConfig[process.env.NODE_ENV];
  var dest = '';
  if (process.env.NODE_ENV == 'development')
    dest = '.tmp/serve';
  else
    dest = 'dist';

  console.log('Generating Config file for ' + process.env.NODE_ENV + '.  Saving to ' + dest);

  return ngConstant({
    constants : envConfig,
    name : "config",
    stream : true
  }).pipe(gulp.dest(dest));
});
