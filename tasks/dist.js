/**
 * Created by pascalbrewing on 28/10/14.
 */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
gulp.task('clean:dist', function (cb) {
  del([
    'dist/**'
  ], cb);
});
gulp.task('concat',['clean:dist'], function () {
  gulp.src('src/**/*.js')
    .pipe($.ngAnnotate({
      add: true,
      sourcemap: true
    }))
    .pipe($.concat('relution-client-login.js'))
    .pipe($.size())
    .pipe(gulp.dest('./dist/'));
});
gulp.task('templates', function () {
  gulp.src('src/templates/*.html')
    .pipe(templateCache({module: 'relutionAuth'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['templates', 'concat', 'gh-pages'], function () {
  gulp.src(['./src/**/*.js', './dist/templates.js'])
    .pipe($.ngAnnotate({
      add: true,
      sourcemap: true
    }))
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.concat('relution-client-login.min.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe($.size())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dev', ['templates', 'concat'], function () {
  gulp.src(['./src/**/*.js', './dist/templates.js'])
    .pipe($.ngAnnotate({
      add: true,
      sourcemap: true
    }))
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.concat('relution-client-login.min.js'))
    .pipe($.sourcemaps.write('./'))
    .pipe($.size())
    .pipe(gulp.dest('./dist/'));
});
