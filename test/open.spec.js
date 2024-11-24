const assert = require('assert');
const makeCommand = require('../lib/open').makeCommand;

describe('makeCommand', function () {
  it('should exits', function () {
    assert.ok(makeCommand);
  });

  it('should return cmd', function () {
    const res = makeCommand('vim', 'test.txt:1:1');
    assert.ok(res.cmd);
  });

  it('should return cwd', function () {
    const res = makeCommand('vim', 'test.txt:1:1');
    assert.ok(res.cwd);
  });

  it('should create editor command', function () {
    const res = makeCommand('editor', 'test.txt:1:1');
    assert.equal(res.cmd, 'editor test.txt:2:2');
  });

  it('should support `projectPath` option', function () {
    const res = makeCommand('editor', 'test.txt:1:1', { projectPath: '/root' });
    assert.equal(res.cwd, '/root');
  });

  it('should support `terminal` option for linux', function () {
    const res = makeCommand('editor', 'test.txt:1:1', { terminal: true, platform: 'linux' });
    assert.ok(res.cmd.match(/^gnome-terminal/));
  });

  it('should support `terminal` option for darwin', function () {
    const res = makeCommand('editor', 'test.txt:1:1', { terminal: true, platform: 'darwin' });
    assert.ok(res.cmd.match(/^osascript/));
  });
});
