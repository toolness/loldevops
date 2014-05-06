var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var nodemailer = require('nodemailer');
var Mustache = require('mustache');

var TIMEOUT = 1000 * 60 * 5;
var CMDLINE = "node run-checks.js";
var USERNAME = process.env['USERNAME'];
var PASSWORD = process.env['PASSWORD'];
var RECIPIENTS = process.env['RECIPIENTS'];
var TEMPLATE = fs.readFileSync(path.join(__dirname, 'email.html'), 'utf-8');

function sendEmail(subject, html) {
  var smtp = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: USERNAME,
      pass: PASSWORD
    }
  });
  smtp.sendMail({
    from: USERNAME,
    to: RECIPIENTS,
    subject: subject,
    html: html
  }, function(err, res) {
    if (err) throw err;
    console.log("email sent to " + RECIPIENTS + ".");
    smtp.close();
  });  
}

exec(CMDLINE, {
  cwd: __dirname,
  timeout: TIMEOUT
}, function(err, stdout, stderr) {
  var subject = '[devopslol] ' + (err ?  'Alas.' : 'All is well!');
  var html = Mustache.render(TEMPLATE, {
    err: err ? JSON.stringify(err) : null,
    stdout: stdout,
    stderr: stderr,
    subject: subject,
    cmdline: CMDLINE
  });

  if (RECIPIENTS) {
    sendEmail(subject, html);
  } else {
    console.log("Subject: " + subject + "\n");
    console.log(html);
  }
});
