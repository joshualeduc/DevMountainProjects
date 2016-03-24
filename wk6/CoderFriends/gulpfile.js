'use strict'

// all your usual requires
const
  gulp     = require('gulp')
, stylus   = require('gulp-stylus')
, concat   = require('gulp-concat')
, uglify   = require('gulp-uglify')
, server   = require('gulp-webserver')
, uglicss  = require('gulp-uglifycss')
, annotate = require('gulp-ng-annotate')

// this is gulp-webserver's syntax. it just takes
// an array of options.
// the src is where it starts picking up files.
// after this, it just uses node's `pipe` to send
// the output of each plugin to the input of the next.
gulp.task('server', () => {
  gulp.src('./dist')
  .pipe(server({
    livereload : true
  , port       : 5050
  , open       : true
  }))
})

// stylus compiles my stylus. if you're using plain css
// you could leave out the stylus plugin and change the `.styl`s
// to `.css`.
// gulp.dest is a built-in to gulp that just chooses an output directory
// gulp.task('stylus', () => {
//   gulp.src('./src/*.styl')
//   .pipe(stylus())
//   .pipe(uglicss())
//   .pipe(concat('css.min.css'))
//   .pipe(gulp.dest('./dist'))
// })

// ng-annotate is an angular-specific thing to keep
// angular code from breaking entirely
gulp.task('js', () => {
  gulp.src('./src/*.js')
  .pipe(annotate())
  .pipe(uglify())
  .pipe(concat('js.min.js'))
  .pipe(gulp.dest('./public'))
})

// watch is a built-in. it watches files for changes, then runs the assigned task(s)
gulp.task('watch', () => {
  // gulp.watch('./src/*.styl', ['stylus'])
  gulp.watch('./src/*.js', ['js'])
})

// the default task is what's run if you just type in `gulp` in the terminal
// gulp.task('default', ['stylus', 'js', 'watch', 'server'])
gulp.task('default', ['js', 'watch', 'server'])