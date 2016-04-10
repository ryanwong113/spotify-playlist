var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function () {  
  gulp.src('public/js/ng/*.js')
      .pipe(concat('spotify-playlist.js'))
      .pipe(gulp.dest('public/js')
  )
})
