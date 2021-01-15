var gulp = require('gulp'); 
var babel = require('gulp-babel');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('es6', function () { 
    return gulp.src('src/js/*.js')   
  
    .pipe(babel({ "presets": ["env"]
}))    
.pipe(gulp.dest('js'));
 });

 gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write({ includeContent: true }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 10 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
        .pipe(notify("Sass Compiled!")); //Mensaje

});



gulp.task('watchSass', function () {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    //gulp.watch('./src/scss/**/*.scss', ['styles']);
});
 
 gulp.task('process', function () {
    return gulp.src(['./src/js/*.js']) //Origen
        .pipe(babel({ "presets": ["env"] }))
        //.pipe(obfuscate())     
        .pipe(uglify())
        .pipe(gulp.dest('./public/js')) //Destino
        .pipe(notify("JS Compiled!")); //Mensaje

});

 gulp.task('default', function () {
    gulp.watch('./src/js/*.js', gulp.series('process'));
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    //gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});