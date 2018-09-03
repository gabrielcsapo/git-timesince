const test = require('tape')
const path = require('path')
const os = require('os')

const { time, timesince } = require('../lib/util')

test('time', (t) => {
  t.plan(6)

  t.test('time in seconds', (t) => {
    t.equal(time(1234567890, 'seconds'), '1234567s')
    t.end()
  })

  t.test('time in minutes', (t) => {
    t.equal(time(1234567890, 'minutes'), '20576m')
    t.end()
  })

  t.test('time in hours', (t) => {
    t.equal(time(1234567890, 'hours'), '342h')
    t.end()
  })

  t.test('time in days', (t) => {
    t.equal(time(1234567890, 'days'), '14d')
    t.end()
  })

  t.test('time in days', (t) => {
    t.equal(time(1234567890, 'weeks'), '2w')
    t.end()
  })

  t.test('time should work without type', (t) => {
    t.equal(time(1234567890), '1234567890ms')
    t.end()
  })
})

test('timesince', (t) => {
  t.plan(2)

  t.test('successfully get data from a valid git repository', async (t) => {
    const dir = path.resolve(__dirname, '..')

    const time = await timesince(dir)
    t.equal(time.length, 3)
    t.equal(typeof time[0], 'string') // the path to the git repository on local disk
    t.equal(typeof time[1], 'number') // the diff in milliseconds
    t.equal(typeof time[2], 'string') // the time in human readable form
    t.ok(time)
    t.end()
  })

  t.test('should return empty array when git repos are scanned', async (t) => {
    const dir = os.homedir()

    const time = await timesince(dir)

    t.equal(time.length, 0)
    t.end()
  })
})
