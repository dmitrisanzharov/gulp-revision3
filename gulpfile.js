const gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat'); 
var cssnano = require('gulp-cssnano');
var del = require('del');


gulp.task('console', done => {
    console.log('gulp is running');
    done();
});


gulp.task('html', done => {
    gulp.src('./src/html/*.html')
    .pipe(gulp.dest('dist/html'));
    done();
});

gulp.task('js', async done=> {

    await del(['./dist/js/*.js']);

    gulp.src('./src/js/*.js')
    .pipe(concat('allJs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
    done();
});

gulp.task('sass', done=> {
    gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
    done();
})

gulp.task('watch', ()=> {
    gulp.watch('src/js/*.js', gulp.series('js'));
    gulp.watch('src/sass/*.sass', gulp.series('sass')); 
    gulp.watch('src/html/*.html', gulp.series('html'))
});




gulp.task('default', gulp.series('console', 'html', 'js', 'sass')); 