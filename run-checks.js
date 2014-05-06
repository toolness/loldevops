var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var async = require('async');
var printf = require('printf');

var CHECKS_DIR = path.join(__dirname, 'checks');
var PROCESS_LIMIT = 5;
var TIMEOUT = 40000;
var JS_RE = /^(.+)\.js$/;
var CHECK_FILENAMES = fs.readdirSync(CHECKS_DIR).filter(function(filename) {
  return JS_RE.test(filename);
}).sort();

async.mapLimit(CHECK_FILENAMES, PROCESS_LIMIT, function(filename, cb) {
  var basename = filename.match(JS_RE)[1];
  var abspath = path.join(CHECKS_DIR, filename);
  var ended = false;
  var onClose = function(code) {
    if (ended) return;
    ended = true;

    clearTimeout(timeout);
    if (typeof(code) == 'number')
      code = code === 0 ? 'OK' : 'ERROR';

    printf(process.stdout, '%-50s %s\n', basename, code);
    cb(null, code);
  };
  var timeout = setTimeout(function() {
    child.kill('SIGKILL');
    onClose('TIMEOUT');
  }, TIMEOUT);
  var child = spawn(process.execPath, [abspath], {
    stdio: 'ignore'
  });

  child.on('close', onClose);
}, function(err, codes) {
  if (err) throw err;

  var didAnyFail = codes.some(function(code) { return code != 'OK'; });

  if (didAnyFail) {
    console.log("\nSome checks failed.");
    process.exit(1);
  } else {
    console.log("\nAll checks passed.");
    process.exit(0);
  }
});
