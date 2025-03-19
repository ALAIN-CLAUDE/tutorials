const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
  jsdev: [
    './javascripts-dev/vendor/jszip.js',
    './javascripts-dev/vendor/jszip-utils.js',
    './javascripts-dev/vendor/FileSaver.js',
    './javascripts-dev/src/downloader.js',
    './javascripts-dev/src/zipper.js',
    './javascripts-dev/src/ui.js',
    './javascripts-dev/main.js',
  ],
  jsdist: './javascripts/',
};

function js() {
  return gulp
      .src(paths.jsdev)
      .pipe(sourcemaps.init())
      .pipe(concat('downloader-bundle.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.jsdist));
}

function watch() {
  gulp.watch(paths.jsdev, js);
}

function server() {
  browsersync.init({
    server: {
      baseDir: './',
      routes: {
        "/test": 'javascripts-dev',
      },
    },
    port: 4000,
    notify: false,
    open: false,
  });
}

const build = gulp.series(js, gulp.parallel(watch, server));

gulp.task('default', build);