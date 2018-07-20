const gulp = require('gulp')
const yargs = require('yargs').argv
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const csso = require('gulp-csso')
const autoprefix = require('gulp-autoprefixer')
const nunjucksRender = require('gulp-nunjucks-render')

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

gulp.task('nunjucks', () => {
    'use strict'

    return gulp.src('./src/nunjucks/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
        path: ['./src/nunjucks']
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
})

gulp.task('default', ['sass', 'nunjucks'])

gulp.task('watch', ['default'], () => {
    'use strict'

    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/nunjucks/**/*.html', ['nunjucks'])
})