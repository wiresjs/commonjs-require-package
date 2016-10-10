# Automatically require files names from a package (consume)


```js
const gulp = require('gulp');
const writeRequires = require("commonjs-require-package");
gulp.task('build', function() {
    var toResult = gulp.src('example/**/*.js')
        .pipe(writeRequires(["routes/"], "app.js"))
        .pipe(gulp.dest('build/'));
});
```

Prepends to app.js:

```js
require("./routes/MainRoute.js");
require("./routes/UserRoute.js");
```
