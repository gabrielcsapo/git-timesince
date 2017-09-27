module.exports.time = function time(ms, type) {
  switch(type) {
    case 'seconds':
      return `${Math.floor(ms / 1000)}s`;
    case 'minutes':
      return `${Math.floor(ms / (1000 * 60))}m`;
    case 'hours':
      return `${Math.floor(ms / (1000 * 60 * 60))}h`;
    case 'days':
      return `${Math.floor(ms / (1000 * 60 * 60 * 24))}d`;
    case 'weeks':
      return `${Math.floor(ms / (1000 * 60 * 60 * 24 * 7))}w`;
    default:
      return `${ms}ms`;
  }
};
