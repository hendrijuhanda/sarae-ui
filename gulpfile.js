/**
 * Main entry for gulp tasks. 
 * The tasks include of Sass compiler and HTML template builder with Nunjucks.
 * 
 * @since 0.0.1
 * 
 */

const gulp = require('gulp')
const yargs = require('yargs').argv
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const csso = require('gulp-csso')
const autoprefix = require('gulp-autoprefixer')
const nunjucksRender = require('gulp-nunjucks-render')

/**
 * Sass compiler task.
 * Output css file to src/compiled/css and to dist/css in production mode (minified).
 *
 */
gulp.task('sass', () => {
    'use strict'

    let sass_output = gulp.src('./src/sass/app.scss')
        .pipe(sass({
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(autoprefix())

    if (!yargs.production) {
        return sass_output.pipe(rename('sarae-ui.min.css'))
        .pipe(gulp.dest('./compiled/css'))
    }
    else {
        return sass_output.pipe(csso())
        .pipe(rename('sarae-ui.min.css'))
        .pipe(gulp.dest('./dist/css'))
    }
})

/**
 * Template purpose is only for showcasing and documenting.
 * Output index.html to root.
 */
gulp.task('nunjucks', () => {
    'use strict'

    return gulp.src('./src/nunjucks/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
        path: ['./src/nunjucks']
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
})

/**
 * Default and watcher runner.
 */
gulp.task('default', ['sass', 'nunjucks'])

gulp.task('watch', ['default'], () => {
    'use strict'

    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/nunjucks/**/*.html', ['nunjucks'])
})