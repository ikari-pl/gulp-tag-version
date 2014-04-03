gulp-tag-version
================

Tag git repository with current package version (gulp plugin)

Example gulpfile
----------------

```js
// dependencies
var gulp = require('gulp'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version');
    
// config
var paths = {
    versionToBump : ['./package.json', './bower.json']
};

// sample bumping and pushing :-) task
gulp.task('big-release', function() {
    gulp.src(paths.versionToBump)
        .pipe(bump({type: 'major'}))
        .pipe(gulp.dest('./'))
        .pipe(filter('package.json')) // do it only once
        .pipe(tag_version({ push: true }));
});
```