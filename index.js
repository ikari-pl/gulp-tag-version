var map = require('map-stream'),
  gutil = require('gulp-util'),
  gift = require('gift');

/**
 * @param opts {object} Module options, passed _also_ to underlying `git.tag`
 * @param opts.key {string?} The key in package.json from which version is read, defaults to 'version'
 * @param opts.prefix {string?} Prefix prepended to version when creating tag name, defaults to 'v'
 * @param opts.push {boolean?} Push tags tagging? Default: true
 * @param opts.version {string?} Alternatively, just pass the version string here. Default: undefined.
 */
module.exports = function(opts) {
  if(!opts) opts = {}
  if(!opts.key) opts.key = 'version'
  if(typeof opts.prefix === 'undefined') opts.prefix = 'v'
  if(typeof opts.push === 'undefined') opts.push = true

  function tagItInGit(file, callback) {
    var version = opts.version, // OK if undefined at this time
      repo = gift(opts.cwd || process.env.PWD),
      tag;

    if(!opts.version) {
      if(file.isNull()) return callback(null, file)
      if(file.isStream()) return callback(new Error('gulp-tag-version: streams not supported'))

      var json = JSON.parse(file.contents.toString());
      version = json[opts.key]
    }
    tag = opts.prefix+version
    gutil.log('Tagging as: '+gutil.colors.cyan(tag))

    // Retrieve all the existing tags
    repo.tags(function(err, tags) {
      // Collect their names
      var tagNames = tags.map(function(tag) {
         return tag.name;
      });

      // If it does not exist, we can tag safely.
      if (tagNames.indexOf(tag) < 0) {
        repo.create_tag(tag, opts, function (err) {
          callback(err, file);
        });
      } else {
        // Revert the "bump" commit because the command would fail.
        gutil.log("Tag " + gutil.colors.cyan(tag) + " already exists!");
        callback(new Error("Tag '" + tag + "' already exists!"))
      }
    });
  }


  return map(tagItInGit)
};
