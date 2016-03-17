var gulp = require( 'gulp' )
var sass = require( 'gulp-ruby-sass' )
var browserSync = require( 'browser-sync' )
var browserify = require( 'browserify' )
var source = require( 'vinyl-source-stream' )

var srcPaths = {
  js: 'app/main.js',
  comps: 'app/components/**/*',
  images: '',
  styles: ''
};

var distPaths = {
  root: 'dist/',
  comps: 'dist/components',
  images: 'dist/images',
  styles: 'dist/styles',
  html: 'dist/index.html'
}

gulp.task( 'serve', function() {

    browserSync.init({
      server: {
          baseDir: "./dist/"
      }
    });

    gulp.watch( srcPaths.js, [ 'browserify', browserSync.reload ] )
    gulp.watch( srcPaths.styles, [ 'sass' ] );
    gulp.watch( distPaths.html ).on( 'change', browserSync.reload );
    gulp.watch( srcPaths.comps, ['copyComponents', browserSync.reload]);
});

gulp.task( 'browserify', function() {
    return browserify( srcPaths.js )
        .bundle()
        .pipe( source( 'main.js' ) )
        .pipe( gulp.dest( distPaths.root ) );
})

gulp.task( 'sass', function() {
    return gulp.src( srcPaths.styles )
        .pipe( sass() )
        .pipe( gulp.dest( distPaths.js ) )
        .pipe( browserSync.stream() );
});

gulp.task( 'copyComponents', function() {
  return gulp.src( srcPaths.comps )
        .pipe( gulp.dest( distPaths.comps ) );
})

gulp.task( 'watch', function() {
    gulp.watch( srcPaths.js, [ 'browserify' ] )
})

gulp.task( 'default', [ 'serve', 'watch' ] );
