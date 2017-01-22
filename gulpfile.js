var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
const eslint = require('gulp-eslint');


var autoprefixerOptions = {
    browsers: ['last 5 versions', '> 1%']
};

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
    in: [
        './node_modules/jquery/dist/jquery.min.js',
        source + 'js/*.js',
        //bootstrapSass.in + 'assets/javascripts/bootstrap/affix.js',
        //bootstrapSass.in + 'assets/javascripts/bootstrap/alert.js',
        //bootstrapSass.in + 'assets/javascripts/bootstrap/button.js',
        //bootstrapSass.in + 'assets/javascripts/bootstrap/carousel.js',
        // bootstrapSass.in + 'assets/javascripts/bootstrap/collapse.js',
        // bootstrapSass.in + 'assets/javascripts/bootstrap/dropdown.js',
        bootstrapSass.in + 'assets/javascripts/bootstrap/modal.js',
        //bootstrapSass.in + 'assets/javascripts/bootstrap/popover.js',
        //bootstrapSass.in + 'assets/javascripts/bootstrap/scrollspy.js',
        // bootstrapSass.in + 'assets/javascripts/bootstrap/tab.js',
        //bootstrapSass.in + 'assets/javascripts/bootstrap/tooltip.js',
        // bootstrapSass.in + 'assets/javascripts/bootstrap/transition.js',

    ],
    out: dest + 'js/',
    watch: source + 'js/*.js',
}

var img = {
    in: [source + 'img/*.*',],
    out: dest + 'img/'
}

// Our scss source folder: .scss files
var scss = {
    in: source + 'scss/style.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precision: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};


gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer(autoprefixerOptions))
       // .pipe(minifyCss())
        .pipe(gulp.dest('build/css/'))
});


// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

gulp.task('bootstrap', function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(minifyCss())
        .pipe(gulp.dest(scss.out));
});


gulp.task('img', function () {
    return gulp.src(img.in)
        .pipe(gulp.dest(img.out));
});

gulp.task('javascript', function () {
    return gulp.src(js.in)
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(js.out));
});


gulp.task('lint', function () {
    return gulp.src(js.in).pipe(eslint())
        .pipe(eslint.format())
        // Brick on failure to be super strict
        .pipe(eslint.failOnError());
});


// default task
gulp.task('dev', ['sass', 'javascript', 'fonts', 'bootstrap','img'], function () {
    gulp.watch(scss.watch, ['sass']);
    gulp.watch(js.watch, ['javascript']);
});