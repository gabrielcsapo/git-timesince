#!/usr/bin/env node

const Table = require('turtler')

const { timesince, print } = require('../lib/util')

let program = {}
const args = process.argv.slice(2)

args.forEach((arg, i) => {
  switch (arg) {
    case '-v':
    case '--version':
    case 'version':
      console.log(`v${require('../package.json').version}`); // eslint-disable-line
      process.exit(0)
      break
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
`)
      process.exit(0)
      break
    case '-r':
    case '--recursive':
      program.recursive = true
      break
    case '-t':
    case '--timeFormat':
      program.timeFormat = args[i + 1]
      break
    case '-d':
    case '--directory':
      program.directory = args[i + 1]
      break
    case '-s':
    case '--sort':
      program.sort = args[i + 1]
      break
  }
})

const { sort = 'desc', directory = process.cwd(), recursive = false, timeFormat = 'days' } = program;

(async function () {
  const log = [[]]
  const times = await timesince(directory, { recursive, timeFormat })

  if (!recursive) {
    return process.stdout.write(`${times[0]} [${times[2]}]\n`)
  }

  print(times, log, directory, sort, 0)

  // make sure the last row is uniform
  if (log[log.length - 1].length !== log[0].length) {
    const filler = new Array(log[0].length - log[log.length - 1].length).fill('')

    log[log.length - 1] = log[log.length - 1].concat(filler)
  }

  process.stdout.write(new Table(log, {
    hasHeader: false,
    columnSeparator: ' '
  }).toString())
}())
