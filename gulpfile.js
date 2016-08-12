'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const run = require('run-sequence');
const del = require('del');
const nodemon = require('gulp-nodemon');
const miniJS = require('gulp-uglify');

gulp.task('default', (callback) => {
    run(['build'], ['watch'], callback);
});
gulp.task('clear', (callback) => {
    console.log('this is clear task..................');
    del('./dist/**/*.*');
    callback();
});
gulp.task('build-babel', () => {
    console.log('this is build-babel task.................');
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(miniJS())
        .pipe(gulp.dest('./dist'));
});
gulp.task('build', (callback) => {
    run(['clear'], ['build-babel'], callback);
});
gulp.task('start', () => {
    nodemon({
        script: './dist/mz_node.js',
        ext: 'js'
    });
})
gulp.task('watch', () => {
    console.log('this is watch task.................');
    gulp.watch('./src/**/*.js', ['build']);
});