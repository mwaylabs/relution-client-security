/**
 * Created by pascalbrewing on 28/10/14.
 */
'use strict';
var gulp = require('gulp');
var gulpDocs = require('gulp-ngdocs');
gulp.task('docs', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulpDocs.process())
        .pipe(gulp.dest('./docs'));
});
