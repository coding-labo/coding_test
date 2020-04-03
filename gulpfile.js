var gulp = require('gulp');
// エラーハンドリング

//minify化
//var minifycss = require('gulp-minify-css');

//ベンダープレフィックス付与
//var autoprefixer = require('gulp-autoprefixer');

// エラーハンドリング
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');


// EJS本体
var ejs = require("gulp-ejs");
// ファイル名変更
var rename = require('gulp-rename');


// SASS本体
var sass = require('gulp-sass');


gulp.task("ejs", function() {
    gulp.src(
        ["ejs/**/*.ejs",'!' + "ejs/**/_*.ejs"] 
    )
	.pipe(ejs())
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest("./")) 
});


 
gulp.task('sass', function() {
  gulp.src('scss/**/*.scss') 
  	.pipe(sass({
      outputStyle: 'expanded'
    })).on('error', sass.logError)
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
  gulp.watch('ejs/**/*.ejs', ['ejs']);
  gulp.watch('scss/**/*.scss', ['sass']);
});