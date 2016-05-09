// npm install gulp-less gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-notify gulp-rename del browser-sync --save-dev

var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	del = require('del'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify');

// 编译less
gulp.task('styles', function() {
	return gulp.src('app/less/*.less')
		.pipe(less())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('app/min.css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('app/min.css'))
		.pipe(notify({ message: 'Style task complete' }));
});

// js检验,压缩
gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/min.js'))
		.pipe(notify({ message: 'Scripts task complete'}))
});

// 每次执行之前先清理
gulp.task('clean', function(cb) {
	del(['app/min.css', 'app/min.js'], cb);
});

// 只输入gulp
gulp.task('default', ['clean','styles', 'scripts']);

// 输入gulp browser-sync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./app"
		}
	});
	gulp.watch("./bin/**/*.*").on('change', browserSync.reload);
});