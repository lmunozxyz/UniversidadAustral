'use strict'
var gulp = require('gulp');
var sass =  require('gulp-sass');
var browserSync = require('browser-sync').create();

    gulp.task('sass', done => {
        gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
        done();
      });

      gulp.task('sass:watch', function(done){
        // added done above too
    
        gulp.watch('./css/*.scss', gulp.series('sass') )
        browserSync = require('browser-sync');
        done();
    })

      gulp.task('browser-sync', done => {
        var files = ['./*.html','./css/*.css','./img/*.{png, jpg, gif}','./js/*.js'];
        browserSync.init(files, {
            server: {
                baseDir: './'
                }
            });
        
        done();
      });

   gulp.task('default', gulp.series(['sass', 'browser-sync', 'sass:watch']))