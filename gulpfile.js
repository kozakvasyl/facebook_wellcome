var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src(['app/sass/**/*.scss', 'app/sass/**/*.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('app/css'))
});
  
gulp.task('watch', function() {
      gulp.watch(['app/**/*.scss', 'app/**/*.sass'], ['sass']);
});
  
gulp.task('serve', function() {
      browserSync.init({
        server: 'app'
      });
      browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});
  
  gulp.task('copy', function() {
        gulp.src(['app/**/*.*', '!app/sass/**', '!app/css/maps/**'])
            .pipe(gulp.dest('dist'))
    });
    
  gulp.task('clean', function () {
        return gulp.src('dist', {read: false})
            .pipe(clean());
    });
  
  gulp.task('default', ['sass', 'clean', 'copy', 'watch', 'serve']);