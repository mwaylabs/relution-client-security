/**
 * Created by pascalbrewing on 28/10/14.
 */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('gh-pages', ['docs'], function () {
  return gulp.src('./docs/**/*')
    .pipe($.ghPages());
});
