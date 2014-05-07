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

## Example Emails

When your checks succeed, you'll receive an email that looks something like this:

<blockquote>
<h1>[devopslol] All is well!</h1>

<p>Details follow.</p>
<h4>stdout for <code>node run-checks.js</code></h4>
<pre>weblitmapper.webmakerprototypes.org                OK
planet.openbadges.org                              OK
planet.hivelearningnetworks.org                    OK
planet.opennews.org                                OK
directory.hivenyc.org                              OK

All checks passed.
</pre>
</blockquote>

When at least one check fails, you'll receive an email that looks something like this:

<blockquote>
<h1>[devopslol] Alas.</h1>

<p>Details follow.</p>

<h4>stdout for <code>node run-checks.js</code></h4>
<pre>directory.hivenyc.org                              ERROR
weblitmapper.webmakerprototypes.org                OK
planet.openbadges.org                              OK
planet.hivelearningnetworks.org                    OK
planet.opennews.org                                OK

Some checks failed.
</pre>


<h4>error object returned from <code>exec("node run-checks.js")</code></h4>
<pre>{&quot;killed&quot;:false,&quot;code&quot;:1,&quot;signal&quot;:null}</pre>

<p>For any checks that failed, run
  <code>node checks/<em>check-name</em>.js</code>
  from the root of the <code>devopslol</code> repository to see 
  detailed output.
</p>
</blockquote>

## License

Public Domain [CC0 1.0 Universal][cczero].

  [Heroku scheduler]: https://devcenter.heroku.com/articles/scheduler
  [cczero]: http://creativecommons.org/publicdomain/zero/1.0/
