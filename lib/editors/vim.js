const settings = {
  executable: 'vim',
  // enable the tabs if vim compiled with the +clientserver option
  // pattern: '--servername OE --remote-tab-silent "+call cursor({line}, {column})" {filename}',
  pattern: '"+call cursor({line}, {column})" {filename}',
  platforms: ['darwin', 'linux'],
  terminal: true
};

const detect = require('../detect').platformSupport(settings.platforms, settings.executable);
const open = require('../open').detectAndOpenFactory(detect, settings);

module.exports = {
  settings,
  detect,
  open
};
