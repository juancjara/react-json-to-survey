var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('compressJS', function() {
  gulp.src('build/reactToJson.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('dist', ['compressJS'])