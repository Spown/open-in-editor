const settings = {
  pattern: '{filename}:{line}:{column}'
};

const detect = require('../detect').lazy('Sublime Text', ['subl'], '-h', {
  darwin: [
    '/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'
  ],
  win32: [
    'C:/Program Files/Sublime Text/subl.exe',
    'C:/Program Files/Sublime Text 2/subl.exe',
    'C:/Program Files/Sublime Text 3/subl.exe',
    'C:/Program Files (x86)/Sublime Text/subl.exe',
    'C:/Program Files (x86)/Sublime Text 2/subl.exe',
    'C:/Program Files (x86)/Sublime Text 3/subl.exe'
  ]
});

const open = require('../open').detectAndOpenFactory(detect, settings);

module.exports = {
  settings,
  detect,
  open
};
