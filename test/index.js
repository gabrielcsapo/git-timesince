const test = require('tape');
const path = require('path');
const os = require('os');

const timesince = require('../index');

test('git-timesince', (t) => {
  t.plan(2);

  t.test('successfully get data from a valid git repository', (t) => {
    const dir = path.resolve(__dirname, '..');

    timesince(dir, (error, time) => {
      t.ok(!error);
      t.ok(time);
      t.end();
    });
  });

  t.test('should fail if the directory is not a valid git repository', (t) => {
    const dir = os.homedir();

    timesince(dir, (error, time) => {
      t.ok(error);
      t.ok(!time);
      t.end();
    });
  });
  
});
