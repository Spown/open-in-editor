const fs = require('fs');
const path = require('path');
const lazyDetect = require('../../detect').lazy;

const settings = {
  pattern: '{projectPath} --line {line} {filename}'
};

const winDirs = (function() {
  const jetbrainsFolder = 'c:/Program Files (x86)/JetBrains/';

  if (!fs.existsSync(jetbrainsFolder)) {
    return [];
  }

  return fs.readdirSync(jetbrainsFolder)
    .map(function(name) {
      return path.join(jetbrainsFolder, name);
    })
    .filter(function(path) {
      return fs.statSync(path).isDirectory();
    });
})();

module.exports = function(config) {
  const detect = lazyDetect(config.name, [], '', {
    darwin: [
      '/Applications/' + config.appFolder + '.app/Contents/MacOS/' + config.executable
    ],
    win32: winDirs.map(function(dir) {
      return dir + '/bin/' + config.executable + '.exe';
    })
  });
  const open = require('../../open').detectAndOpenFactory(detect, settings);

  return {
    settings,
    detect,
    open
  };
};
