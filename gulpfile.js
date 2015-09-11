var gulp = require('gulp');
var stylus = require('gulp-stylus');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var browserSync = require('browser-sync');
var jsonServer = require('gulp-json-srv');
var shell = require('gulp-shell')

var b = browserify('./src/main.js', {debug: true}).transform(babelify);

var port = {
  restful : 25000,
  websocket : 25001
};

//REST
var server = jsonServer.start({
  data: 'mock-services/restful/db.json',
  port: port.restful,
  deferredStart: true
});

//Web Sockets
gulp.task('websocket', shell.task([
  //Makes sure websockets are cleaned up
  'node mock-services/websockets/server.js ' + port.websocket
]))

gulp.task('browserify', function () {
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public'))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: "./public"
  })
});

gulp.task('serverStart', function () {
  server.start();
});

gulp.task('css', function() {
  gulp.src('src/css/main.styl')
      .pipe(stylus({
        compress: true
      }))
      .pipe(gulp.dest('./public/style/'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('src/css/*.styl', ['css']);
  gulp.watch(['mock-services/restful/db.json'], function(){
    server.reload();
  });
  gulp.watch('public/**').on('change', browserSync.reload)
});

gulp.task('default', ['serverStart','websocket','browser-sync','watch']);