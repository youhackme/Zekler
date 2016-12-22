var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('app/css/style.css'))
});