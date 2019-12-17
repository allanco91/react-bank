const gulp = require('gulp');
const touch = require('gulp-touch-cmd');
const webpack = require('webpack-stream');
var livereload = require('gulp-livereload');

gulp.task('compile', function () {
   return gulp.src('src/index.tsx')
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('dist/'))
      .pipe(touch())
      .pipe(livereload());
});

gulp.task('watch', function () {
   livereload.listen();
   gulp.watch('./src/**/*.tsx', gulp.series('compile'));
});