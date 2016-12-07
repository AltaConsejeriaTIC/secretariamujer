var gulp = require('gulp');
var connect = require('gulp-connect-php');

gulp.task('default', ['connect']);

gulp.task('connect', function () {
    connect.server({
        hostname: '0.0.0.0',
        port: 9000,
        base: 'drupal-8.2.3'
    });
});
