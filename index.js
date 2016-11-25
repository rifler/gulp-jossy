'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var Jossy = require('Jossy').Jossy;
var jossyInstance;

var pluginName = 'gulp-jossy';

function getJossyInstance () {
    if (jossyInstance) {
        jossyInstance = new Jossy();
    }

    return jossyInstance;
}

module.exports = function (opts) {
    opts = opts || {};

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError(pluginName, 'Streaming not supported'));
            return;
        }

        getJossyInstance().compile(file, opts.labels, opts.context)
            .then(function (text) {
                file.contents = new Buffer(text);
                cb(null, file);
            })
            .catch(function (err) {
                cb(new gutil.PluginError(pluginName, err, {
                    fileName: file.path,
                    showProperties: false
                }));
            });
    });
};
