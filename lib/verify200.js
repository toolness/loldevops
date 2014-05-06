var request = require('request');
var should = require('should');

module.exports = function(url, regexp) {
  request(url, function(err, res, body) {
    console.log("Retrieved", url);
    if (err) throw err;
    res.statusCode.should.eql(200);
    if (regexp)
      body.should.match(regexp);
    console.log("  OK!");
  });
};
