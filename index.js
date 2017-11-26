const fs = require('fs');
const path = require('path');

const { exec } = require('child_process');
const { time } = require('./lib/util');

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
  if(typeof options === 'function') {
    callback = options;
    options = {};
  }

  const { recursive, timeFormat } = options;

  if(recursive) {
    const directories = fs.readdirSync(directory);

    directories.forEach((d) => {
      let dir = path.resolve(directory, d);
      if(fs.existsSync(path.resolve(dir, '.git'))) {
        Timesince(dir, options, (error, time) => {
          if(!error) {
            console.log(`${d} [${time}]`); // eslint-disable-line
          }
        });
      }
    });
  }

  try {
    exec("git log --pretty=format:'%aD' -1", {
      cwd: directory
    }, (error, response) => {
      if(error) return callback(error);

      const raw = response.toString('utf8').split('\n');

      callback(null, time(Math.abs(new Date().getTime() - new Date(raw[0]).getTime()), timeFormat || 'days'));
    });
  } catch(ex) {
    callback(ex);
  }
};
