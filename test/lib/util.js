const test = require('tape');

const { time } = require('../../lib/util');

test('util', (t) => {
  t.plan(6);

  t.test('time in seconds', (t) => {
    t.equal(time(1234567890, 'seconds'), '1234567s');
    t.end();
  });

  t.test('time in minutes', (t) => {
    t.equal(time(1234567890, 'minutes'), '20576m');
    t.end();
  });

  t.test('time in hours', (t) => {
    t.equal(time(1234567890, 'hours'), '342h');
    t.end();
  });

  t.test('time in days', (t) => {
    t.equal(time(1234567890, 'days'), '14d');
    t.end();
  });

  t.test('time in days', (t) => {
    t.equal(time(1234567890, 'weeks'), '2w');
    t.end();
  });

  t.test('time should work without type', (t) => {
    t.equal(time(1234567890), '1234567890ms');
    t.end();
  });

});
