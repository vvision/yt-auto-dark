/**
 *
 */
logStep(
  `Welcome page URL: ${browser.runtime.getURL('pages/welcome/welcome.html')}`,
);
browser.runtime.onInstalled.addListener(
  ({ previousVersion, reason, temporary }) => {
    logStep('Check whether to show welcome page.');
    if (temporary && !debug) {
      // Skip during development, not during debug
      return;
    }
    if (previousVersion && previousVersion.charAt(0) === '3') {
      logStep('Do not show release notes after minor updates.');
      return;
    }
    if (reason === 'install' || reason === 'update') {
      logStep('Show welcome page in new tab.');
      const url = browser.runtime.getURL('pages/welcome/welcome.html');
      browser.tabs.create({ url });
    }
  },
);
