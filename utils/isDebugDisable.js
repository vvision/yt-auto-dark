const fs = require('fs');
const code = fs.readFileSync(`${__dirname}/../src/core/logger.js`);

if (code.includes('const debug = true;')) {
  // Failure
  process.exit(1);
} else {
  // Success. Safe to build.
  process.exit(0);
}
