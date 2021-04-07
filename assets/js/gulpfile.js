var gulp = require('gulp')
var browserify = require('gulp-browserify')
var concat = require('gulp-concat')
var style = require('gulp-style')
var refresh = require('gulp-livereload')
var lr = require('tiny-lr')
var server = lr()

gulp.task('scripts', function () {
  gulp
    .src(['src/**/*.js'])
    .pipe(browserify())
    .pipe(concat('dest.js'))
    .pipe(gulp.dest('build'))
    .pipe(refresh(server))
})

gulp.task('styles', function () {
  gulp
    .src(['css/**/*.css'])
    .pipe(style({ compress: true }))
    .pipe(gulp.dest('build'))
    .pipe(refresh(server))
})
gulp.task('sccs', function () {
    gulp
      .src(['css/**/*.scss'])
      .pipe(style({ compress: true }))
      .pipe(gulp.dest('build'))
      .pipe(refresh(server))
  })

gulp.task('lr-server', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err)
  })
})

gulp.task('default', function () {
  gulp.run('lr-server', 'scripts', 'styles')

  gulp.watch('src/**', function (event) {
    gulp.run('scripts')
  })

  gulp.watch('css/**', function (event) {
    gulp.run('styles')
  })
  gulp.watch('scss/**', function (event) {
    gulp.run('sccs')
  })
})
