const gulp = require('gulp');
const path = require('path');

// Task to copy SVG icons to the dist folder
gulp.task('build:icons', function() {
  return gulp.src('./nodes/**/*.svg')
    .pipe(gulp.dest('./dist/nodes/'));
});

// Default task
gulp.task('default', gulp.series('build:icons'));