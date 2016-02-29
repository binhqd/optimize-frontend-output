'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

var historyApiFallback = require('connect-history-api-fallback');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
      '/tasks' : 'index.html'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: historyApiFallback(),
      routes: routes
    },
    port: 8001,
    browser: browser
  });
}

gulp.task('serve:dist', function () {
  browserSyncInit(paths.dist);
});

gulp.task('serve:dist:assets', function () {
  browserSync.init(null, {
    startPath: '/robots.txt',
    server: {
      baseDir: paths.dist + '',
      middleware: historyApiFallback()
    },
    port: 3001,
    middleware: function (req, res, next) {
      if (/^\/(scripts|styles)\/(.*?).(js|css)/.test(req.url)) {
        res.setHeader('Content-Encoding', 'gzip');
      };
      
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      next();
    }
  });
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([paths.tmp + '/serve', paths.src], null, []);
});

gulp.task('serve:e2e-dist', ['buildapp'], function () {
  browserSyncInit(paths.dist, null, []);
});
