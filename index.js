var map = require('map-stream'),
  gutil = require('gulp-util'),
  git = require('gulp-git')

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
    git.tag(tag, 'tagging as '+tag, opts)
    cb(null, file)
  }


  return map(modifyContents)
};
