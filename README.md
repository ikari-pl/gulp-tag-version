gulp-tag-version
================

Tag git repository with current package version (gulp plugin).

It will read the `version` attribute (by default, override with `key` option) from the JSON stream (probably your `package.json` or `bower.json`), prefixes it with `"v"` (override with `prefix` option), tags the repository with such created tagname (e.g. `v1.2.3`) and pushes (overrite with `push: false	`) to upstream.

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

Thanks :beer:
--------

* to guys and gals from Fractal for [Gulp](http://gulpjs.com/) itself, obviously 
* to Steve Lacy (http://slacy.me) for creating [`gulp-bump`](https://github.com/stevelacy/gulp-bump) and [`gulp-git`](https://github.com/stevelacy/gulp-git) used here
* The main file structure is based on `gulp-bump` a bit as well (this is my first plugin :))

