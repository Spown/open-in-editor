const path = require('path');
const helperPath = path.resolve(__dirname, 'visualstudio.vbs');

const settings = {
  pattern: '{filename} {line} {column}'
};

const detect = require('../detect').platformSupport(['win32'], 'Visual Studio', helperPath);
const open = require('../open').detectAndOpenFactory(detect, settings);

module.exports = {
  settings,
  detect,
  open
};
