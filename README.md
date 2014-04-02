gulp-tag-version
================

Tag git repository with current package version (gulp plugin)

Example gulpfile
----------------

    // dependencies
    var gulp = require('gulp'),
        bump = require('gulp-bump'),
        tag_version = require('gulp-tag-version');
        
    // config
    var paths = {
        versionToBump : ['./package.json', './bower.json'],
        versionToCheck: './package.json'
    };
    
    // sample bumping and pushing :-) task
    gulp.task('big-release', function() {
        gulp.src(paths.versionToBump)
            .pipe(bump({type: 'major'}))
            .pipe(gulp.dest('./'));
    });
    gulp.task('tag', function() {
        gulp.src(paths.versionToCheck)
            .pipe(tag_version({ push: true }));
    });
    gulp.task('default', ['big-release', 'tag']);
