#!/usr/bin/env node

const program = require('commander');

const Timesince = require('../');

program
  .version(require('../package.json').version)
  .option('-r, --recursive', 'Recursively looks through directories, using the current working directory as the base')
  .option('-t, --timeFormat <range>', 'The time format that the output will be formatted in, [seconds, minutes, hours, days, weeks]')
  .option('-d, --directory [directory]', 'The current working directory, defaults to process.cwd()')
  .parse(process.argv);

const { directory=process.cwd(), recursive=false, timeFormat="days" } = program;

Timesince(directory, {
  recursive,
  timeFormat
}, (error, time) => {
  if(!error) {
    console.log(`${directory} [${time}]`); // eslint-disable-line
  }
});
