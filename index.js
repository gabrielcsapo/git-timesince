const fs = require('fs');
const path = require('path');

const { exec } = require('child_process');
const { time, getDirectories } = require('./lib/util');

function git(directory, timeFormat, callback) {
  try {
    exec("git log --pretty=format:'%aD' -1", {
      cwd: directory
    }, (error, response) => {
      if (error) return callback(error);

      const raw = response.toString('utf8').split('\n');
      const diff = new Date().getTime() - new Date(raw[0]).getTime();

      return callback(null, [directory, diff, time(diff, timeFormat || 'days')]);
    });
  } catch (ex) {
    return callback(ex);
  }
}

/**
 * gets the timesince for a given git directory
 * @method timesince
 * @param  {String}  directory - the directory of which to get the time since
 * @param  {Object=} options - an object containing options to override defaults
 * @param  {Boolean} options.recursive - passed in to recursively find nested git repos
 * @param  {String} options.timeFormat - the timeFormat of the output will be formatted in [seconds, minutes, hours, days, weeks]
 * @param  {Function} callback - function to call when time has been calculated
 * @return {[type]}            [description]
 */
module.exports = function Timesince(directory, options={}, callback) {
  try {
    let times = [];

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    const { recursive, timeFormat } = options;

    if (recursive) {

      const directories = getDirectories(directory);
      let total = directories.length;

      // don't continue stop automatically
      if (total === 0) {
        return callback(new Error('no directories to search'));
      }

      function done() {
        total -= 1;
        if (total === 0) {
          return callback(null, times);
        }
      }

      directories.forEach((d) => {
        let dir = path.resolve(directory, d);
        if (fs.existsSync(path.resolve(dir, '.git'))) {
          git(dir, timeFormat, (error, time) => {
            if (!error && time.length > 0) {
              times.push(time);
            }
            done();
          });
        } else {
          Timesince(dir, options, (error, time) => {
            if (!error && time.length > 0) {
              times.push(time);
            }
            done();
          });
        }
      });
    } else {
      git(directory, timeFormat, (error, time) => {
        return callback(error, time);
      });
    }
  } catch (ex) {
    return callback(ex);
  }
};
