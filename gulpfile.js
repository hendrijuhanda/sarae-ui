const gulp = require('gulp')
const yargs = require('yargs').argv
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const nop = require('gulp-nop')
const csso = require('gulp-csso')
const autoprefix = require('gulp-autoprefixer')

gulp.task('default', ['sass'])

gulp.task('watch', ['default'], () => {
    'use strict'

    gulp.watch('./src/sass/**/*.scss', ['sass'])
})

gulp.task('sass', () => {
    'use strict'

    let sass_output = gulp.src('./src/sass/app.scss')
        .pipe(sass({
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(autoprefix())

    if (!yargs.production) {
        sass_output.pipe(rename('sarae-ui.min.css'))
        .pipe(gulp.dest('./compiled/css'))
    }
    else {
        sass_output.pipe(csso())
        .pipe(rename('sarae-ui.min.css'))
        .pipe(gulp.dest('./dist/css'))
    }
})