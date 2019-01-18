// This is INCORRECT
const { series, parallel,src, dest } = require('gulp');
const gulp = require('gulp');
const watch = require('gulp-watch');
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
    return gulp.src('src/assets/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/assets/'));
  });

  gulp.task('js', () => {
    return gulp.src(['src/assets/*/*/*.js'])
        .pipe(browserify())
        .pipe(minify())
        .pipe(gulp.dest('dist/assets/'));
  });

  gulp.task('img', () => {
    return gulp.src(['src/assets/common/img/*.*'])
        .pipe(gulp.dest('dist/assets/common/img/'));
  });

  gulp.task('html', () => {
    return gulp.src(['src/assets/**/*.html'])
        // .pipe(browserify())
        // .pipe(minify())
        .pipe(gulp.dest('dist/assets/'));
  });

  gulp.task('watch', function() {
    gulp.watch('src/assets/**/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/*/*/*.js', gulp.series('js'));
    gulp.watch('src/assets/common/img/*.*', gulp.series('img'));
    gulp.watch('src/assets/**/*.html', gulp.series('html'));
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
  exports.build = series(clean, parallel("sass", "js", "img", "html", "styleguide"), "watch");

  //exports.default = build;
