#!/usr/bin/env node

const Table = require('cli-table2');
const program = require('commander');

const Timesince = require('../');

program
  .version(require('../package.json').version)
  .option('-r, --recursive', 'Recursively looks through directories, using the current working directory as the base')
  .option('-t, --timeFormat <range>', 'The time format that the output will be formatted in, [seconds, minutes, hours, days, weeks]')
  .option('-d, --directory [directory]', 'The current working directory, defaults to process.cwd()')
  .parse(process.argv);

const { directory = process.cwd(), recursive = false, timeFormat = "days" } = program;

let currentLine = 0;
let log = [[]];

function print(times) {
  times.forEach((time) => {
    if (log[currentLine].length == 4) {
      currentLine += 1;
      log[currentLine] = [];
    }
    if (Array.isArray(time[0])) {
      print(time);
    } else {
      let name = time[0].replace(`${directory}/`, '');
      if(name == '/') name = process.cwd().substr(process.cwd().lastIndexOf('/') + 1, process.cwd().length);

      log[currentLine].push(`${name} [${time[1]}]`); // eslint-disable-line
    }
  });
}

Timesince(directory, { recursive, timeFormat }, (error, times) => {
  if (error) {
    console.log(`error parsing directory ${error}`); // eslint-disable-line
  } else {
    print(times, 0);

    var table = new Table({
      chars: {
        'top': '',
        'top-mid': '',
        'top-left': '',
        'top-right': '',
        'bottom': '',
        'bottom-mid': '',
        'bottom-left': '',
        'bottom-right': '',
        'left': '',
        'left-mid': '',
        'mid': '',
        'mid-mid': '',
        'right': '',
        'right-mid': '',
        'middle': ' '
      },
      style: {
        'padding-left': 0,
        'padding-right': 0
      }
    });

    log.forEach((l) => table.push(l));

    console.log(table.toString()); // eslint-disable-line
  }
});
