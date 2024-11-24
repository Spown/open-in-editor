const extractFilename = require('./utils').extractFilename;
const number = require('./utils').number;
const assign = require('./utils').assign;
const editors = require('./editors');
const openFactory = require('./open').factory;

module.exports = {
  configure: function(options, cb) {
    options = options || {};
    cb = cb || function() {};

    const sourceLineOffset = number(options.line, 1);
    const sourceColumnOffset = number(options.column, 1);
    let editor = options.editor;
    let cmd = options.cmd;
    let open;

    if (!cmd && !editor) {
      if (Object.prototype.hasOwnProperty.call(editors, process.env.OPEN_FILE)) {
        editor = process.env.OPEN_FILE;
      } else {
        cmd = process.env.OPEN_FILE ||
              process.env.VISUAL ||
              process.env.EDITOR;
      }
    }

    // if editor option is set then fail on wrong value
    if (editor && !Object.prototype.hasOwnProperty.call(editors, editor)) {
      cb(new Error('Wrong value for `editor` option: ' + editor));
      return;
    }

    if (cmd) {
      const settings = {};

      // use editor settings as base
      if (Object.prototype.hasOwnProperty.call(editors, editor)) {
        assign(settings, editors[editor].settings);
      }

      open = openFactory(cmd, assign(settings, options));
    } else {
      if (!editor) {
        cb(new Error('Editor is not specified'));
        return;
      }

      open = editors[editor].open;
    }

    return {
      open: function(filename) {
        if (!filename) {
          return Promise.reject(new Error('File is not specified'));
        }

        const info = extractFilename(filename);

        return open([
          info.filename,
          Math.max(info.line - sourceLineOffset, 0),
          Math.max(info.column - sourceColumnOffset, 0)
        ].join(':'));
      }
    };
  }
};
