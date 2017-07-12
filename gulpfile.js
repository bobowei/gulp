var gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	minify = require('gulp-minify-css'),
	//	concat = require('gulp-concat'),
	concat = require('gulp-concat-dir'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	obfuscate = require('gulp-obfuscate'),
	clean = require('gulp-clean'),
	gulpSequence = require('gulp-sequence'),
	htmlmin = require('gulp-htmlmin');
gulp.task('webHtml', function() {
	var options = {
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		minifyJS: true,
		minifyCSS: true
	};
	gulp.src('page/*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('../../../webapp/page'));
});
gulp.task('webCss', function() {
	return gulp.src('css/**/*.css')
		.pipe(minify())
		.pipe(gulp.dest('../../../webapp/css'));
});

gulp.task('webJs', function() {
	return gulp.src('js/**/*.js').pipe(uglify({mangle:true})).pipe(gulp.dest('../../../webapp/js'));
});
gulp.task('webImg', function() {
	return gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('../../../webapp/img'));
});
gulp.task('webFont', function() {
	return gulp.src('font/**/*.*').pipe(gulp.dest('../../../webapp/font'));
});
gulp.task('watch', function() {
	gulp.watch('src/*/*.html', ['webHtml']);
	gulp.watch('src/*/*.css', ['webCss']);
	gulp.watch('src/*/*.js', ['webJs']);
	gulp.watch('src/img/*', ['webImg']);
});
gulp.task('clean', function(cb) {
	return gulp.src('../../../webapp').pipe(clean());
});

gulp.task('default',['webHtml', 'webCss', 'webJs', 'webImg','webFont'])