const atHomeDir = require('../utils').atHomeDir;

const settings = {
  pattern: '-r -g {filename}:{line}:{column}'
};

const detect = require('../detect').lazy('Visual Studio Code', ['code'], '-h', {
  darwin: [
    '/Applications/Visual Studio Code.app/Contents/MacOS/Electron'
  ],
  win32: [
    'C:/Program Files/Microsoft VS Code/bin/code.cmd',
    'C:/Program Files (x86)/Microsoft VS Code/bin/code.cmd',
    atHomeDir('AppData/Local/Code/bin/code.cmd')
  ]
});

const open = require('../open').detectAndOpenFactory(detect, settings);

module.exports = {
  settings,
  detect,
  open
};
