var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var browserSync = require( 'browser-sync' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



var srcPaths = {
  jsPath: ['app/**/*.js', '!app/third-party.js'],
  thirdPartyJsPath: 'app/third-party.js',
  compsPath: 'app/components/**/*',
  imagesPath: 'app/images/**',
  stylesPath: 'app/styles/**/*.scss'
};

var distPaths = {
  root: 'dist/',
  scriptsPath: 'dist/scripts',
  compsPath: 'dist/components',
  imagesPath: 'dist/images',
  stylesPath: 'dist/styles',
  htmlPath: 'dist/index.html'
}

gulp.task( 'serve', function() {

    browserSync.init({
      server: {
          baseDir: "./dist/"
      }
    });

});

gulp.task( 'concatScripts', function() {
    return gulp.src( srcPaths.jsPath )
    .pipe( concat( 'main.js' ) )
    .pipe( gulp.dest( distPaths.scriptsPath ) )
})

gulp.task( 'compileThirdParty', function() {
    return browserify( srcPaths.thirdPartyJsPath )
        .bundle()
        .pipe( source( 'third-party.js' ) )
        .pipe( gulp.dest( distPaths.scriptsPath ) );
})

gulp.task( 'sassCompile', function() {
    return gulp.src( srcPaths.styles )
        .pipe(sass().on('error', sass.logError))
        .pipe( gulp.dest( distPaths.stylesPath ) )
        .pipe( browserSync.stream() );
});

gulp.task('imageMin', function(){
  gulp.src( srcPaths.imagesPath )
    .pipe( cache(
      imagemin ( {
         optimizationLevel: 3,
         progressive: true,
         interlaced: true
       } ) ) )
    .pipe( gulp.dest( distPaths.imagesPath ) );
});

gulp.task( 'copyComponents', function() {
  return gulp.src( srcPaths.compsPath )
        .pipe( gulp.dest( distPaths.compsPath ) );
})

gulp.task( 'watch', function() {
  gulp.watch( srcPaths.jsPath, [ 'concatScripts', browserSync.reload ] );
  gulp.watch( srcPaths.thirdPartyJsPath, [ 'compileThirdParty', browserSync.reload ] );
  gulp.watch( srcPaths.imagesPath, [ 'imageMin' ] );
  gulp.watch( srcPaths.stylesPath, [ 'sassCompile' ] );
  gulp.watch( distPaths.htmlPath, [ browserSync.reload] );
  gulp.watch( srcPaths.compsPath, ['copyComponents', browserSync.reload ] );
})

gulp.task( 'default', [ 'serve', 'watch' ] );
