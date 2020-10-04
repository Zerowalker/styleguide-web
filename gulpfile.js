/* eslint-disable import/no-commonjs */
// ==========================================================================
//
// TASKS:
//
// "gulp"                       -   Build and watch combined
// "gulp watch"                 -   Watch for file changes and compile changed files
// "gulp build"                 -   Build assets
// "gulp icons"                 -   Build icons
// "gulp patch/minor/major"     -   Bump package version
//
// ==========================================================================

require('./gulp/sass');
require('./gulp/dss');
require('./gulp/icons');
require('./gulp/sass-bem');
require('./gulp/scripts');

const gulp = require('gulp');

const bump = require('gulp-bump');
const git = require('gulp-git');
const filter = require('gulp-filter');
const tagVersion = require('gulp-tag-version');

gulp.task('default', function (callback) {
  return gulp.series('instructions', 'build', 'watch', callback);
});
gulp.task(
  'build:sass',
  gulp.series('sass-dev', 'sass-dist', 'sass-json', 'dss-sass')
);
gulp.task('build:scripts', gulp.series('scripts', 'dss-scripts'));

gulp.task(
  'build',
  gulp.series('sass-font-awesome', 'build:sass', 'build:scripts')
);

gulp.task('icons', gulp.series('iconfont', 'build:sass'));

gulp.task('watch', function () {
  gulp.watch('source/js/**/*.js', ['build:scripts']);
  gulp.watch('source/sass/**/*.scss', ['build:sass']);
});

gulp.task('instructions', function () {
  console.log(
    "NOTICE: Always run 'gulp patch, gulp minor, gulp major' to bump versions in styleguide!"
  );
});

function inc(importance) {
  return gulp
    .src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Bumps package version'))
    .pipe(filter('package.json'))
    .pipe(tagVersion());
}

gulp.task('patch', function () {
  return inc('patch');
});
gulp.task('minor', function () {
  return inc('minor');
});
gulp.task('major', function () {
  return inc('major');
});

gulp.task('bem', gulp.series('build:bem', 'watch:bem'));

require('require-dir')('./gulp');
