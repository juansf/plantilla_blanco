'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const plumber = require ('gulp-plumber');

const reload = browserSync.reload;

// Compile sass files to css
gulp.task('sass', function () {
  return gulp.src('./src/sass/style.sass')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 15 versions'],
            cascade: false
      }))
      .pipe(gulp.dest('./dirt/css/'))
      .pipe(browserSync.reload({stream:true}))
});

// Compile pug files to html
gulp.task('pug', () =>{
  return gulp.src('./src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./dirt/'))
    
});


gulp.task('default', ['sass', 'pug'] ,function() {
    browserSync.init({
        server: {
            baseDir: "./dirt/"
        }
    });
    gulp.watch("./src/sass/**/*.scss", ['sass']);
    gulp.watch("./src/pug/**/*.pug").on('change', browserSync.reload);
});



