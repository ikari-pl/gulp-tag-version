gulp-tag-version
================

Tag git repository with current package version (gulp plugin).

It will read the `version` attribute (by default, override with `key` option) from the JSON stream (probably your `package.json` or `bower.json`), prefixes it with `"v"` (override with `prefix` option) and tags the repository with such created tagname (e.g. `v1.2.3`).


Example gulpfile (actually this package uses it)
------------------------------------------------

```js

// dependencies
var gulp = require('gulp'),
	git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    prompt = require('gulp-prompt'),
    tag_version = require('gulp-tag-version');

// config
var paths = {
    scripts       : ['src/*.js'],
    versionToBump : ['./package.json'],
    versionToCheck: 'package.json',
    dest          : './'
}

/**
 * Bumping version number.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function inc(importance, cake_mustnt_be_a_lie) {
    var process = gulp.src(paths.versionToBump) // get all the files to bump version in
    	.pipe(prompt.confirm('Have you commited all the changes to be included by this version?'));
    if (cake_mustnt_be_a_lie === true) {
        /* never ever do a big release without proper celebration, it's a company Hoshin thing */
        process.pipe(prompt.confirm('Has cake been served to celebrate the release?'));
    }
    process.pipe(bump({type: importance})) // bump the version number in those files
        .pipe(gulp.dest(paths.dest))  // save it back to filesystem
        .pipe(git.commit('bumps package version')) // commit the changed version number
        .pipe(filter(paths.versionToCheck)) // read only one file to get the version number
        .pipe(tag_version()) // tag it in the repository 
        //.pipe(git.push('origin', 'master', { args: '--tags' })) // push the tags to master
}

gulp.task('patch', function() { return inc('patch'); })
gulp.task('feature', function() { return inc('minor'); })
gulp.task('release', function() { return inc('major', true); })
```

Thanks :beer:
--------

* to guys and gals from Fractal for [Gulp](http://gulpjs.com/) itself, obviously 
* to Steve Lacy (http://slacy.me) for creating [`gulp-bump`](https://github.com/stevelacy/gulp-bump) and [`gulp-git`](https://github.com/stevelacy/gulp-git) used here
* The main file structure is based on `gulp-bump` a bit as well (this is my first plugin :))

