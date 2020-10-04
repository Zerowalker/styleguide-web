const gulp = require('gulp');

const package = require('../package.json');

const concat = require('gulp-concat');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const copy = require('gulp-copy');
const sourcemaps = require('gulp-sourcemaps');

const node_modules = 'node_modules/';

// Concatenate & Minify JS
gulp.task('scripts', function () {
  return gulp
    .src([
      node_modules + 'packery/dist/packery.pkgd.js',
      node_modules + 'jquery/dist/jquery.js',
      'plugins/jquery-ui-1.11.4/jquery-ui.js',
      //   node_modules + 'es6-weakmap/dist/weakmap.min.js',
      node_modules + 'hyperform/dist/hyperform.js',
      node_modules + 'flickity/dist/flickity.pkgd.min.js',
      'source/js/**/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('hbg-prime.dev.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(copy('dist/' + package.version + '/js/', {prefix: 2}))
    .pipe(rename('hbg-prime.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('dist/js'))
    .pipe(copy('dist/' + package.version + '/js/', {prefix: 2}));
});
