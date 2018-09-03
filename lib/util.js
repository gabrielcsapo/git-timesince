const fs = require('fs')
const path = require('path')

const childProcess = require('child_process')
const { promisify } = require('util')

const exec = promisify(childProcess.exec)

async function git (directory, timeFormat, callback) {
  try {
    const { stdout } = await exec("git log --pretty=format:'%aD' -1", {
      cwd: directory
    })

    const raw = stdout.toString('utf8').split('\n')
    const diff = new Date().getTime() - new Date(raw[0]).getTime()

    return [directory, diff, time(diff, timeFormat || 'days')]
  } catch (ex) {
    return []
  }
}

/**
 * gets the timesince for a given git directory
 * @method timesince
 * @param  {String}  directory - the directory of which to get the time since
 * @param  {Object=} options - an object containing options to override defaults
 * @param  {Boolean} options.recursive - passed in to recursively find nested git repos
 * @param  {String} options.timeFormat - the timeFormat of the output will be formatted in [seconds, minutes, hours, days, weeks]
 * @return {[type]}            [description]
 */
async function timesince (directory, options = {}) {
  const times = []
  const { recursive, timeFormat } = options

  if (recursive) {
    const directories = getDirectories(directory)

    // don't continue stop automatically
    if (directories.length === 0) {
      return []
    }

    for (const _directory of directories) {
      const dir = path.resolve(directory, _directory)

      if (fs.existsSync(path.resolve(dir, '.git'))) {
        const time = await git(dir, timeFormat)

        times.push(time)
      } else {
        const time = await timesince(dir, options)

        times.push(time)
      }
    }

    return times.filter((a) => {
      return a.length > 0
    })
  } else {
    return git(directory, timeFormat)
  }
}

const isDirectory = (source) => fs.lstatSync(source).isDirectory()

function getDirectories (source) {
  return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
};

function print (times, log, directory, sort, currentLine = 0) {
  const maxColumns = parseInt(process.stdout.columns / 25)

  times.sort((a, b) => {
    return sort === 'asc' ? b[1] - a[1] : a[1] - b[1]
  }).forEach((time) => {
    if (log[currentLine].length === maxColumns) {
      currentLine += 1
      log[currentLine] = []
    }
    if (Array.isArray(time[0])) {
      print(time)
    } else {
      let name = time[0].replace(`${directory}/`, '')

      if (name === '/') name = process.cwd().substr(process.cwd().lastIndexOf('/') + 1, process.cwd().length)

      log[currentLine].push(`${name} [${time[2]}]`); // eslint-disable-line
    }
  })
}

function time (ms, type) {
  switch (type) {
    case 'seconds':
      return `${Math.floor(ms / 1000)}s`
    case 'minutes':
      return `${Math.floor(ms / (1000 * 60))}m`
    case 'hours':
      return `${Math.floor(ms / (1000 * 60 * 60))}h`
    case 'days':
      return `${Math.floor(ms / (1000 * 60 * 60 * 24))}d`
    case 'weeks':
      return `${Math.floor(ms / (1000 * 60 * 60 * 24 * 7))}w`
    default:
      return `${ms}ms`
  }
};

module.exports = {
  getDirectories,
  timesince,
  print,
  time
}
