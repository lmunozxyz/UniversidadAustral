'use strict'
var gulp = require('gulp');
var sass =  require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cleanCss = require('gulp-clean-css');
var flatmap = require('gulp-flatmap');
var htmlmin = require('gulp-htmlmin');

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

  gulp.task('default', gulp.series(['sass', 'browser-sync', 'sass:watch']));

   gulp.task('clean', function(){
     return del(['dist']);
   });


  gulp.task('copyfonts', function(done){
      gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf, woff, eof, svg, eot, otf}*')
      .pipe(gulp.dest('./dist/fonts'));
      done();
    });

   gulp.task('imagemin', function(done){
      return gulp.src('./img/*.{png,jpg, jpeg, gif}')
      .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
      .pipe(gulp.dest('./dist/img'));
      done();
   });

   gulp.task('usemin', function(done){
     return gulp.src('./*.html')
        .pipe(flatmap(function(stream, file){
          return stream
            .pipe(usemin({
              css:[rev()],
              html:[function(){return htmlmin({collapseWhitespace:true})}],
              js:[uglify(), rev()],
              inlinejs: [uglify()],
              inlinecss: [cleanCss(), 'concat']
            }))
        }))
        .pipe(gulp.dest('dist'));
        done();
   });

 

   gulp.task('build', gulp.series(['clean', 'copyfonts', 'imagemin', 'usemin']));