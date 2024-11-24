const exec = require('child_process').exec;
const number = require('./utils').number;
const shell = require('./editors/common/shell');
const extractFilename = require('./utils').extractFilename;
const assign = require('./utils').assign;
const terminal = require('./editors/common/terminal');

function makeCommand(cmd, filename, settings) {
  const defaultOptions = {
    pattern: '{filename}:{line}:{column}',
    projectPath: process.env.PROJECT_PATH || process.PWD || process.cwd(),
    terminal: false
  };
  const cmdOptions = cmd ? { cmd } : {};
  const options = assign(defaultOptions, settings, cmdOptions);
  let command = shell(options.cmd || options.executable).concat(shell.parse(options.pattern));
  const info = extractFilename(filename);
  const args = {
    filename: info.filename,
    line: info.line + number(options.line, 1),
    column: info.column + number(options.column, 1),
    projectPath: options.projectPath
  };
  if (options.terminal) {
    command = terminal(command, options);
  }
  return {
    cmd: String(command.withParams(args)),
    cwd: options.projectPath
  };
}

function open(cmd, filename, settings) {
  return new Promise(function(resolve, reject) {
    const command = makeCommand(cmd, filename, settings);
    exec(command.cmd, { cwd: command.cwd }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = open;
module.exports = assign(module.exports, {
  makeCommand,
  factory: function(cmd, settings) {
    return function openInEditor(filename) {
      return open(cmd, filename, settings);
    };
  },
  detectAndOpenFactory: function(detect, settings) {
    return function openInEditor(filename) {
      return detect().then(function(cmd) {
        return open(cmd, filename, settings);
      });
    };
  }
});
