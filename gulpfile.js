var gulp = require( 'gulp' )
var sass = require( 'gulp-ruby-sass' )
var browserSync = require( 'browser-sync' )
var browserify = require( 'browserify' )
var source = require( 'vinyl-source-stream' )

var srcPaths = {
  js: 'app/main.js',
  images: '',
  styles: ''
};

var distPaths = {
  js: 'dist/js',
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

    gulp.watch( srcPaths.js, [ 'browserify' ] )
    gulp.watch( srcPaths.styles, [ 'sass' ] );
    gulp.watch( distPaths.html ).on( 'change', browserSync.reload );
});

gulp.task( 'browserify', function() {
    return browserify( srcPaths.js )
        .bundle()
        .pipe( source( 'main.js' ) )
        .pipe( gulp.dest( distPaths.js ) );
})

gulp.task( 'sass', function() {
    return gulp.src( srcPaths.styles )
        .pipe( sass() )
        .pipe( gulp.dest( distPaths.js ) )
        .pipe( browserSync.stream() );
});

gulp.task( 'watch', function() {
    gulp.watch( srcPaths.js, [ 'browserify' ] )
})

gulp.task( 'default', [ 'serve', 'watch' ] );
