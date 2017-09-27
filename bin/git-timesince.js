#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');

const timesince = require('../');

program
  .version(require('../package.json').version)
  .option('-r, --recursive', 'Recursively looks through directories, using the current working directory as the base')
  .option('-t, --timeFormat <range>', 'The time format that the output will be formatted in, [seconds, minutes, hours, days, weeks]')
  .option('-d, --directory [directory]', 'The current working directory, defaults to process.cwd()')
  .parse(process.argv);

const { directory=process.cwd(), recursive=false, timeFormat="days" } = program;

if(recursive) {
  const directories = fs.readdirSync(directory);

  directories.forEach((d) => {
    let dir = path.resolve(directory, d);
    if(fs.existsSync(path.resolve(dir, '.git'))) {
      timesince(dir, (error, time) => {
        if(error) {
          console.log(`${d} [?]`); // eslint-disable-line
        } else {
          console.log(`${d} [${time}]`); // eslint-disable-line
        }
      }, timeFormat);
    }
  });

} else {
  timesince(directory, (error, time) => {
    if(error) {
      console.log(`${directory} [?]`); // eslint-disable-line
    } else {
      console.log(`${directory} [${time}]`); // eslint-disable-line
    }
  }, timeFormat);
}
