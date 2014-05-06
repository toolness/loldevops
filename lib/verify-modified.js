var request = require('request');

var MS_PER_DAY = 1000 * 60 * 60 * 24;

exports.inPastDay = function(url) {
  request.head(url, function(err, res) {
    console.log("Retrieved", url);

    if (err) throw err;

    var strDate = res.headers['last-modified'];
    var date = new Date(strDate);
    var dateDiff = Math.abs(Date.now() - date.getTime());

    if (typeof(dateDiff) != 'number' || isNaN(dateDiff))
      throw new Error("Could not parse date: " + strDate);

    if (dateDiff > MS_PER_DAY)
      throw new Error("URL was last modified on " + strDate);

    console.log("  Last modified on " + strDate + ", OK!");
  });
};
