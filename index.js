var map = require('map-stream'),
  gutil = require('gulp-util'),
  git = require('gulp-git'),
  gift = require('gift');

module.exports = function(opts) {
  if(!opts) opts = {}
  if(!opts.key) opts.key = 'version'
  if(typeof opts.prefix === 'undefined') opts.prefix = 'v'
  if(typeof opts.push === 'undefined') opts.push = true

  function modifyContents(file, cb) {

    if(file.isNull()) return cb(null, file)
    if(file.isStream()) return cb(new Error('gulp-tag-version: streams not supported'))

    var json = JSON.parse(file.contents.toString()),
    	tag = opts.prefix+json[opts.key]
    gutil.log('Tagging as: '+gutil.colors.cyan(tag))

    // gift is a full-fledge git plugin
    var APP_DIR = process.env.PWD;
    var repo = gift(APP_DIR);

    // Retrieve all the existing tags
    repo.tags(function(err, tags) {
      // Collect their names
      var tagNames = tags.map(function(tag) {
         return tag.name;
      });

      // If it does not exist, we can tag safely.
      if (tagNames.indexOf(tag) < 0) {
        git.tag(tag, 'tagging as '+tag, opts);

      } else {
        // Revert the "bump" commit because the command would fail.
        gutil.log("Tag " + gutil.colors.cyan(tag) + " exists! Revering commit...");
        repo.reset("HEAD^", function(err) {
          if (err) {
            return cb(new Error(err));
          }
        });
      }
    });

    cb(null, file)
  }


  return map(modifyContents)
};
