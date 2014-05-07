This is a simple tool that should be run once per day to tell
a coder whether their experimental stuff is crashing.

## Prerequisites

Node v0.10.

## Usage

You'll want to run `npm install` to install dependencies.

You'll want to define the following environment variables:

* `USERNAME` is the Gmail email address that will be used to send email
  from.
* `PASSWORD` is the password for the Gmail account.
* `RECIPIENTS` is the comma-separated list of email addresses to
  send status emails to. If undefined, no email will be sent, and
  output will instead be logged to stdout.

Run `email-checks.js` to run all the checks and send an email about
their status.

Set up this command as a daily `cron` or [Heroku Scheduler][] job
and you're done.

Alternatively, if you just want to run all the checks and output the
results to stdout, run `run-checks.js`. This script will exit with
a nonzero exit code if any of the checks failed.

## Creating a Check

A check is just a node script in the `checks` directory. It should
exit with a code of 0 if it's successful, or 1 otherwise. If it
takes too long to run, it will automatically be terminated (and this
counts as an error condition).

## License

Public Domain [CC0 1.0 Universal][cczero].

  [Heroku scheduler]: https://devcenter.heroku.com/articles/scheduler
  [cczero]: http://creativecommons.org/publicdomain/zero/1.0/
