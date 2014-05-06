var verify200 = require('../lib/verify-200');

verify200('http://weblitmapper.webmakerprototypes.org/', /Web Literacy/);
verify200('http://weblitmapper.webmakerprototypes.org/json?p=1');
