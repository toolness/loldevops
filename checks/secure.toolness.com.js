var verify200 = require('../lib/verify-200');

verify200('https://secure.toolness.com/my-ubiquity-commands/wowhead/',
          /Ubiquity/);
