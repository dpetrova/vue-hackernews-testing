/* convert a URL to a hostname */
export function host(url) {
  if (!url) {
    return ''
  }
  //remove the protocol and the paths
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  //return the last three parts of the domain that are separated by dots
  const parts = host.split('.').slice(-3)
  //remove www if it exists
  if (parts[0] === 'www') {
    parts.shift()
  }
  //join the array into a string and returns the string
  return parts.join('.')
}

/* convert UNIX timestamp to display how long it has been since an item was posted */
export function timeAgo(time) {
  //get the current time, convert it to seconds, and subtract the passed time to get the difference
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    //return the value as minutes, if the difference between the time and current time is less than an hour
    return pluralize(between / 60, ' minute')
  } else if (between < 86400) {
    //return the value as hours, if the difference between the time and current time is less than a day
    return pluralize(between / 3600, ' hour')
  } else {
    //return the value as days
    return pluralize(between / 86400, ' day')
  }
}

/* Helper function to add a plural to the label if the value isn’t 1 */
function pluralize(time, label) {
  const roundedTime = Math.round(time)
  if (roundedTime === 1) {
    return roundedTime + label
  }
  return roundedTime + label + 's'
}
