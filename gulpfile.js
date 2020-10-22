'use strict'

var gulp = require('gulp'),
sass =  require('gulp-sass');

  gulp.task('sass', done => {
    gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
    done();
  });