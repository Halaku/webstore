var gulp = require('gulp');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
var del = require('del');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sprite', function() {
    var spriteData = gulp.src('./app/img/sprite/*.png')
        .pipe(plumber())
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: '/img/sprite.png',
            cssName: 'sprite.scss',
            padding: 50
        }));
    return spriteData
        .pipe(gulpif(
            '*.scss',
            gulp.dest('./app/scss/_misc/'),
            gulp.dest('./dev/img')
        ));
});

gulp.task('jade', function() {
    var YOUR_LOCALS = {};
    gulp.src('./app/jade/pages/*.jade')
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: '\t'
        }))
        .pipe(gulp.dest('./dev'));
});

gulp.task('sass', function() {
    return gulp.src('./app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dev/css'));
});

gulp.task('css', ['sass'], function () {
    return gulp.src('./dev/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dev/css/'));
});

gulp.task('images', function() {
    return gulp.src('./app/img/*.*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./dev/img/'));
});

gulp.task('fonts', function() {
    gulp.src('./app/fonts/*.*')
        .pipe(gulp.dest('./dev/fonts'));
});

gulp.task('server', function() {
    browserSync({
        port: 9000,
        server: {
            baseDir: './dev'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch([
        'dev/*.html',
        'dev/js/**/*.js',
        'dev/css/**/*.css'
    ]).on('change', browserSync.reload);
    gulp.watch('./app/scss/**/*.scss', ['css']);
    gulp.watch('./app/jade/**/*.jade', ['jade']);
});

gulp.task('cleandev', function() {
    del('dev');
});


gulp.task('default', ['server', 'watch']);
