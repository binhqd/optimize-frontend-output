# Best Practice on optimizing front-end output

## 1. No third party code (dependency manager)
  - Don't include anything that not been developed by you
  - Don't commit anything that can be regenerated from other things that were committed such as bower_components, node_modules.

## 2. Minify JS + Uglify
```javascript
var uglify = require('gulp-uglify');
 
gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
```

## 3. Minify CSS
CSS must be minified to make file size smaller. This will save lots of bandwidth.
Example:
```javascript
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
 
gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
```

## 4. Concat JS/CSS files
The purpose of this task is to reduce number of requests to server and make faster load
  - Third party CSS files should be concatenate to one file, developer often named them as `vendor.css`, `vendor.js`
  - Project stylesheet should be concatenate to one file, developer often named them as `main.css`, `styles.css`, `main.js`
 
Example:
```javascript
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
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

## 5. Minify HTML
This task can be done by using `gulp-htmlmin`. The main library of this plugin is `html-minifier` which have lots of great features that help optimize HTML output.

Before minify:
```html
<body>
  <a href='http://mylink.com'>
    My Link
  </a>
  <!-- This is my button -->
  <button disabled="disabled" value="My button"></button>
  <!-- Another comment -->
</body>
```
After minify:
```html
<body><a href='http://mylink.com'>My Link</a><button disabled value="My button"></button>
```
Example of use:
```javascript
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
 
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});
```
## 6. Minify images and svg files
Example:
```javascript
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function() {
  return gulp.src('/images/**/*.{png,jpg,jpeg,gif,svg}')
  .pipe(imagemin({
    progressive : true,
    svgoPlugins : [ {
      removeViewBox : false
    } ],
    use : [ pngquant() ]
  }))
  .pipe(gulp.dest('dist/images'));
});
```

##  7. Gzip output
This task can save up to 10 times of file sizes and it will make the load incredible faster. This can be done with `gulp-gzip`

Example:
```javascript
var gzip = require('gulp-gzip');

gulp.task('compress:dist', function() {
  return gulp.src(['dist/styles/**/*.css', 'dist/scripts/**/*.js'], {base: 'dist'})
    .pipe(gzip({
      append: false
    }))
    .pipe(gulp.dest(paths.dist));
});
```

##  8. LESS/SASS precompiler
```javascript
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(cb) {
  return gulp.src('./src/*.scss')
  .pipe(compass({
    css : './tmp/styles',
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
  .pipe(gulp.dest('./src/styles/'));
});

```
## 9. Prefix assets to prevent cache
This is a must for each deployment to prevent user loading old version of files from their browser cache

Example:
```javascript
var rev = require('gulp-rev');
 
gulp.task('default', function () {
	// by default, gulp would pick `assets/css` as the base, 
	// so we need to set it explicitly: 
	return gulp.src(['assets/css/*.css', 'assets/js/*.js'], {base: 'assets'})
		.pipe(gulp.dest('build/assets'))  // copy original assets to build dir 
		.pipe(rev())
		.pipe(gulp.dest('build/assets'))  // write rev'd assets to build dir 
		.pipe(rev.manifest())
		.pipe(gulp.dest('.tmp')); // write manifest to build dir 
});
```
Manifest output example (rev-manifest.json):
```json
{
  "non_120x120.png": "non_120x120-276ba60a.png",
  "non_400x245.jpg": "non_400x245-1874a0cf.jpg",
  "Loading.gif": "Loading-6b415cd7.gif",
  "badge_iecountdown.png": "badge_iecountdown-af94592e.png",
  "background_pattern.gif": "background_pattern-0abf0883.gif",
  "ideapod-default.jpg": "ideapod-default-d8f4b42e.jpg",
  "non_240x240.png": "non_240x240-90584c55.png",
  "front/icon-point.png": "front/icon-point-77f3ebc2.png"
}
```
You should do update your html, css, js files according to your manifest
```javascript
var revReplace = require("gulp-rev-replace");
gulp.task("revreplace", function() {
  var manifest = gulp.src("/.tmp/rev-manifest.json");

  return gulp.src(opt.srcFolder + "/index.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('dist'));
});
```

## 10. Configuration
## 11. CDNdify
## 12. JSLint/ESLint checker
## 13. SEO friendly
