'use strict';
var PluginError = require('plugin-error');
var through = require('through2');
var Jossy = require('jossy').Jossy;
var jossyInstance;

var pluginName = 'gulp-jossy';

function getJossyInstance () {
    if (!jossyInstance) {
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
            cb(new PluginError(pluginName, 'Streaming not supported'));
            return;
        }

        getJossyInstance().compile(file, opts.labels, opts.context)
            .then(function (text) {
                file.contents = new Buffer(text);
                cb(null, file);
            })
            .catch(function (err) {
                cb(new PluginError(pluginName, err, {
                    fileName: file.path,
                    showProperties: false
                }));
            });
    });
};
