const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('build-script', function () {
	return gulp
		.src('./build/static/js/*.js')
		.pipe(concat('vdr.js'))
		.pipe(
			gulp.dest('./dist/VirtualDocumentRoomModules/Files/SiteAssets/js')
		)
		.pipe(gulp.dest('a:/VDRoom/SiteAssets/js')) //dev
		.pipe(gulp.dest('b:/VDRoom/SiteAssets/js')); //uat
});

gulp.task('build-css', function () {
	return gulp
		.src('./build/static/css/*.css')
		.pipe(concat('vdr.css'))
		.pipe(
			gulp.dest('./dist/VirtualDocumentRoomModules/Files/SiteAssets/css')
		)
		.pipe(gulp.dest('a:/VDRoom/SiteAssets/js')) //dev
		.pipe(gulp.dest('b:/VDRoom/SiteAssets/js')); //uat
});

gulp.task('default', gulp.parallel(['build-script', 'build-css']));
