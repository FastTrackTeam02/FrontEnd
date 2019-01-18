// This is INCORRECT
const { series, parallel,src, dest } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const kss = require('kss');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
  function clean(cb) {
    // body omitted
    cb();
  }
  

  gulp.task('sass', function () {
    return gulp.src('src/assets/**/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/assets/'));
  });
  gulp.task('sass:watch', function () {
    gulp.watch('src/assets/**/*.scss', ['sass']);
  });

  gulp.task('js', () => {
    return gulp.src(['src/assets/*/*/*.js'])
        .pipe(browserify())
        .pipe(minify())
        .pipe(gulp.dest('dist/assets/'));
  });
  gulp.task('js:watch', function () {
    gulp.watch('src/assets/*/*/*.js', ['js']);
  });

  gulp.task('html', () => {
    return gulp.src(['src/assets/**/*.html'])
        // .pipe(browserify())
        // .pipe(minify())
        .pipe(gulp.dest('dist/assets/'));
  });
  gulp.task('html:watch', function () {
    gulp.watch('src/assets/**/*.html', ['html']);
  });

  ////STYLEGUIDE
  
  var styleguideConfig = 
  {
    title: "STYLEGUIDE",
    source: [
        'src/styleguide'
    ],
    destination:  "dist/styleguide",
  
    "//": "The css and js paths are URLs relative to the generated style guide.",
    css: [
        "../assets/common/css/style.css",
    ],
    js: [
        "../assets/common/js/app.js",
    ],
    homepage: '../../src/styleguide/homepage.md'
  };
  
  gulp.task('styleguide', function () {
    // body omitted
    return kss(styleguideConfig);
  });
  
  exports.builddev = series(clean, parallel("styleguide"));
  exports.build = series(clean, parallel("sass", "js", "html", "styleguide"));
  //exports.default = build;
