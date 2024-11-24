const atHomeDir = require('../utils').atHomeDir;

const settings = {
  pattern: '{filename}:{line}:{column}'
};

const detect = require('../detect').lazy('Atom Editor', ['atom'], '-h', {
  darwin: [
    '/Applications/Atom.app/Contents/Resources/app/atom.sh'
  ],
  win32: [
    atHomeDir('AppData/Local/atom/bin/atom.cmd')
  ]
});

const open = require('../open').detectAndOpenFactory(detect, settings);

module.exports = {
  settings,
  detect,
  open
};
