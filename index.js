const { exec } = require('child_process');
const { time } = require('./lib/util');

/**
 * gets the timesince for a given git directory
 * @method timesince
 * @param  {String}  directory - the directory of which to get the time since
 * @param  {Function} callback - function to call when time has been calculated
 * @param  {String} timeFormat - the timeFormat of the output will be formatted in [seconds, minutes, hours, days, weeks]
 * @return {[type]}            [description]
 */
module.exports = function timesince(directory, callback, timeFormat) {
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
