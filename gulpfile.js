var gulp = require("gulp");
var sass = require('gulp-sass');
var environments = require('gulp-environments');
var browserify = require("browserify");
var reactify = require("reactify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

var development = environments.development;
var production = environments.production;

if (production()) {
  var env = "production";
}

if (development()) {
  var env = "development";
}

gulp.task("config", function() {
  console.log("./app/js/config/" + env + ".js");
  return gulp.src("./app/js/config/" + env + ".js")
        .pipe(source("app/js/config.js"))
});

gulp.task("bundle", function () {
    return browserify({
        entries: ["./app/js/bootstrap.js", "./app/js/main.jsx"],
        debug: true
    }).transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/index.html","app/css/*.css"])
        .pipe(gulp.dest("app/dist"));
});

gulp.task("copy-styles", ["styles"], function () {
    return gulp.src(["app/index.html","app/css/*.css"])
        .pipe(gulp.dest("app/dist"));
});

gulp.task('styles', function() {
    gulp.src('app/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css/'));
});

gulp.task("default",["copy"],function(){
   console.log("Gulp completed..."); 
});

gulp.task('watch',function() {
    gulp.watch(['app/sass/**/*.scss', 'app/index.html'],['copy-styles']);
    gulp.watch('app/js/**/*.*',['copy']);
});
//gulp.task('default', ['copy'], function() {
  //gulp.watch(['app/index.html', 'app/**/*.jsx', 'app/**/*.js'], ['copy']);
//});