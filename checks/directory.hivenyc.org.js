var assert = require('assert');

require('https')
  .get('https://directory.hivenyc.org/', function(res) {
    assert.equal(res.statusCode, 200);
  });
