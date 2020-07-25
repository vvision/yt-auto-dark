const fs = require('fs');
fs.copyFileSync(
  `${__dirname}/../node_modules/webextension-polyfill/dist/browser-polyfill.min.js`,
  `${__dirname}/../src/modules/external/browser-polyfill.min.js`,
);

const isPolyfillInstalled = fs.existsSync(
  `${__dirname}/../src/modules/external/browser-polyfill.min.js`,
);
if (isPolyfillInstalled) {
  // Success. Safe to build.
  process.exit(0);
} else {
  // Failure
  process.exit(1);
}
