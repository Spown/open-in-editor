const shell = require('./shell');
const assign = require('../../utils').assign;

const osascript = function(script) {
  return shell.parse('osascript -e').concat(script);
};

const terminal = function(cmd) {
  return 'tell application "Terminal" to do script "' + cmd + '"';
};

const runInTerminalDarwin = function(cmd) {
  return osascript(terminal(cmd));
};

const runInTerminalLinux = function(cmd) {
  return shell.parse('gnome-terminal -x sh -c', cmd);
};

const supported = {
  darwin: runInTerminalDarwin,
  linux: runInTerminalLinux
};

const getTerminal = function(options) {
  const opts = assign({ platform: process.platform }, options || {});

  if (!supported[opts.platform]) {
    throw new Error('Not supported');
  }

  return supported[opts.platform];
};

const runInTerminal = function(cmd, options) {
  const terminal = getTerminal(options);
  return terminal(cmd);
};

module.exports = runInTerminal;
