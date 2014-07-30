var request = require('request');
var should = require('should');

request.post({
  url: 'http://webmaker-screenshot.herokuapp.com/',
  json: {
    url: 'https://toolness.makes.org/thimble/LTcwNzI2NDUxMg==/example'
  }
}, function(err, res, body) {
  console.log('POST to webmaker-screenshot.herokuapp.com');
  if (err) throw err;
  res.statusCode.should.eql(200);
  res.body.screenshot.should.match(/^https?:\/\//);
  console.log("  OK!");
});
