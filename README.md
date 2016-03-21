# Best Practice on optimizing front-end output

## 1. No third party code (dependency manager)
  - Don't include anything that not been developed by you
  - Don't commit anything that can be regenerated from other things that were committed such as bower_components, node_modules.

## 2. Concat JS/CSS files
The purpose of this task is to reduce number of requests to server
  - Third party CSS files should be concatenate to one file, developer often named them as `vendor.css`, `vendor.js`
  - Project stylesheet should be concatenate to one file, developer often named them as `main.css`, `styles.css`, `main.js`

## 3. Minify CSS
  - 

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
