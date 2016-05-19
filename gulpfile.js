'use strict';

const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const browserSync = require( 'browser-sync' );
const browserify = require( 'browserify' );
const source = require( 'vinyl-source-stream' );
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const mocha = require('gulp-mocha');

const srcPaths = {
	jsPath: [ 'public/**/*.js', '!public/third-party.js' ],
	thirdPartyJsPath: 'public/third-party.js',
	compsPath: 'public/components/**/*',
	imagesPath: 'public/images/**',
	stylesPath: 'public/styles/**/*.scss'
};

const distPaths = {
	root: 'dist/',
	scriptsPath: 'dist/scripts',
	compsPath: 'dist/components',
	imagesPath: 'dist/images',
	stylesPath: 'dist/styles',
	htmlPath: 'dist/index.html'
}

gulp.task( 'serve', () => {

	browserSync.init({
		server: {
			baseDir: "./dist/"
		},
		port: 8080,
		open: false
	});

});

gulp.task( 'concatScripts', () => {
	return gulp.src( srcPaths.jsPath )
	.pipe( concat( 'main.js' ) )
	.pipe( gulp.dest( distPaths.scriptsPath ) )
});

gulp.task( 'compileThirdParty', () => {
	return browserify( srcPaths.thirdPartyJsPath )
	.bundle()
	.pipe( source( 'third-party.js' ) )
	.pipe( gulp.dest( distPaths.scriptsPath ) );
});

gulp.task( 'sassCompile', () => {
	return gulp.src( srcPaths.stylesPath )
	.pipe(sass().on('error', sass.logError))
	.pipe( gulp.dest( distPaths.stylesPath ) )
	.pipe( browserSync.stream() );
});

gulp.task('imageMin', () => {
	gulp.src( srcPaths.imagesPath )
	.pipe( cache(
		imagemin ( {
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		} ) ) )
	.pipe( gulp.dest( distPaths.imagesPath ) );
});

gulp.task( 'copyComponents', () => {
	return gulp.src( srcPaths.compsPath )
	.pipe( gulp.dest( distPaths.compsPath ) );
});

gulp.task( 'watch', () => {
	gulp.watch( srcPaths.jsPath, [ 'concatScripts', browserSync.reload ] );
	gulp.watch( srcPaths.thirdPartyJsPath, [ 'compileThirdParty', browserSync.reload ] );
	gulp.watch( srcPaths.imagesPath, [ 'imageMin' ] );
	gulp.watch( srcPaths.stylesPath, [ 'sassCompile' ] );
	gulp.watch( distPaths.htmlPath, [ browserSync.reload] );
	gulp.watch( srcPaths.compsPath, ['copyComponents', browserSync.reload ] );
});

gulp.task( 'default', [ 'serve', 'watch' ] );

gulp.task( 'pre-test', () => {
	return gulp.src( [ 'app/**/*.js', '!app/server.js', '!app/routes/*.js' ] )
	.pipe( istanbul( { includeUntested: true } ) )
	.pipe( istanbul.hookRequire() );

});

gulp.task( 'test', [ 'pre-test' ], () => {
	return gulp.src('test/**/*.js')
	.pipe( mocha() )
	.pipe( istanbul.writeReports() );
});
