const gulp = require('gulp');
const writeRequires = require("./src/plugin.js");
gulp.task('build', function() {
    var toResult = gulp.src('example/**/*.js')
        .pipe(writeRequires(["routes/"], "app.js"))
        .pipe(gulp.dest('build/'));
});
