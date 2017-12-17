#!/usr/bin/env node

const Table = require('cli-table2');

const Timesince = require('../');

let program = {};
const args = process.argv.slice(2);

args.forEach((arg, i) => {
  switch(arg) {
    case '-v':
    case '--version':
    case 'version':
      console.log(`v${require('../package.json').version}`); // eslint-disable-line
      process.exit(0);
    break;
    case '-h':
    case '--help':
    case 'help':
      console.log(`` + // eslint-disable-line
`
  Usage: git-timesince [options]

  Commands:
    -h, --help, help             Output usage information
    -v, --version, version       Output the version number

  Options:
    -s, --sort [direction]       Can change the direction of the time since for the repos provided (asc, desc) [default is desc]
    -r, --recursive              Recursively looks through directories, using the current working directory as the base
    -t, --timeFormat [range]     The time format that the output will be formatted in, [seconds, minutes, hours, days, weeks]
    -d, --directory [directory]  The current working directory, defaults to process.cwd()
`);
     process.exit(0);
    break;
    case '-r':
    case '--recursive':
      program.recursive = true;
    break;
    case '-t':
    case '--timeFormat':
      program.timeFormat = args[i + 1];
    break;
    case '-d':
    case '--directory':
      program.directory = args[i + 1];
    break;
    case '-s':
    case '--sort':
      program.sort = args[i + 1];
    break;
  }
});

const { sort='desc', directory = process.cwd(), recursive = false, timeFormat = "days" } = program;

let currentLine = 0;
let log = [[]];

function print(times) {
  const maxColumns = parseInt(process.stdout.columns / 25);

  times.sort((a, b) => {
    if(sort === 'asc') return b[1] - a[1];
    return a[1] - b[1];
  }).forEach((time) => {
    if (log[currentLine].length == maxColumns) {
      currentLine += 1;
      log[currentLine] = [];
    }
    if (Array.isArray(time[0])) {
      print(time);
    } else {
      let name = time[0].replace(`${directory}/`, '');
      if(name == '/') name = process.cwd().substr(process.cwd().lastIndexOf('/') + 1, process.cwd().length);

      log[currentLine].push(`${name} [${time[2]}]`); // eslint-disable-line
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
