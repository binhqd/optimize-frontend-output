# Best Practice on optimizing front-end output

## 1. No third party code (dependency manager)
  - Don't include anything that not been developed by you
  - Don't commit anything that can be regenerated from other things that were committed such as bower_components, node_modules.

## 2. Concat JS/CSS files
The purpose of this task is to reduce number of requests to server and make faster load
  - Third party CSS files should be concatenate to one file, developer often named them as `vendor.css`, `vendor.js`
  - Project stylesheet should be concatenate to one file, developer often named them as `main.css`, `styles.css`, `main.js`
```javascript
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-clean-css');
var rev = require('gulp-rev');

gulp.task('concatAssets', function() {
  return gulp.src('./*.html')
    .pipe(usemin({
      css: [ minifyCss, rev ],
      js: [ uglify, rev ]
    }))
    .pipe(gulp.dest('dist'));
});
```
## 3. Minify CSS
CSS must be minified to make file size smaller. This will save lots of bandwidth.
```javascript
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
 
gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
```

## 4. Minify JS + Uglify
## 5. Minify HTML
## 6. Minify SVG
## 7. Minify Images
##  8. Gzip output
##  9. LESS/SASS precompiler
## 10. Prefix assets to prevent cache
## 11. Configuration
## 12. CDNdify
## 13. JSLint/ESLint checker
## 14. SEO friendly
