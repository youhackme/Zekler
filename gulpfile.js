var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('app/css/'))
});


// source and distribution folder
var source = 'app/',
    dest = 'build/';

// Bootstrap scss source
var bootstrapSass = {
    in: './node_modules/bootstrap-sass/'
};

// Bootstrap fonts source
var fonts = {
    in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};

var js = {
    in: [source + 'js/*.js', bootstrapSass.in + 'assets/javascripts/bootstrap/*.js'],
    out: dest + 'js/'
}

var img = {
    in: [source + 'img/*.*',],
    out: dest + 'img/'
}

// Our scss source folder: .scss files
var scss = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

gulp.task('bootstrap', function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out));
});


gulp.task('img', function () {
    return gulp.src(img.in)
        .pipe(gulp.dest(img.out));
});

gulp.task('javascript', function () {
    return gulp.src(js.in)
        .pipe(gulp.dest(js.out));
});


// default task
gulp.task('default', ['sass'], function () {
    gulp.watch(scss.watch, ['sass']);
});