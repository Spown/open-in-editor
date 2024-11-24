const settings = {
  executable: 'emacs',
  pattern: '--no-splash "+{line}:{column}" {filename}',
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
