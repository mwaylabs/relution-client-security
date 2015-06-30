/**
 * Created by pascalbrewing on 28/10/14.
 */
'use strict';
var gulp = require('gulp');
var gulpDocs = require('gulp-ngdocs');
var del = require('del');

gulp.task('clean:docs', function (cb) {
  del([
    'docs/**'
  ], cb);
});
var options = {
  html5Mode: true,
  startPage: '/api/relutionClientSecurity',
  title: "Relution Client Security",
  image: "http://www.relution.io/de/wp-content/themes/Divi/images/logo.png",
  imageLink: "https://github.com/mwaylabs/relution-client-security",
  titleLink: "/api/relutionClientSecurity"
};
gulp.task('docs', ['clean:docs'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./docs'));
});