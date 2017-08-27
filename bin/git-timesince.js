#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');

const timesince = require('../');

const cwd = process.cwd();

program
  .version(require('../package.json').version)
  .option('-r, --recursive', 'Recursively looks through directories, using the current working directory as the base')
  .option('-t, --timeFormat <range>', 'The time format that the output will be formatted in, [seconds, minutes, hours, days, weeks]', 'days')
  .parse(process.argv);

if(program.recursive) {
  const directories = fs.readdirSync(cwd);

  directories.forEach((d) => {
    let dir = path.resolve(cwd, d);
    if(fs.existsSync(path.resolve(dir, '.git'))) {
      timesince(dir, (error, time) => {
        if(error) {
          console.log(`${d} [?]`); // eslint-disable-line
        } else {
          console.log(`${d} [${time}]`); // eslint-disable-line
        }
      }, program.timeFormat);
    }
  });

} else {
  timesince(cwd, (error, time) => {
    if(error) {
      console.log(`${cwd} [?]`); // eslint-disable-line
    } else {
      console.log(`${cwd} [${time}]`); // eslint-disable-line
    }
  }, program.timeFormat);
}
