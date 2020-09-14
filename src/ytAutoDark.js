/* ytAutoDark. Automatically toggle Youtube built-in dark theme.
 * Copyright (C) 2019-2020  Victor VOISIN

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Is dark theme enabled ?
 */
const isDarkThemeEnabled = () => {
  return Boolean(document.querySelector('html').hasAttribute('dark'));
};

/**
 * Three dot menu button.
 */
const isMenuButtonAvailableInDom = () => {
  return Boolean(
    document.querySelectorAll('ytd-topbar-menu-button-renderer')[2],
  );
};

const clickMenu = () => {
  logStep('Click on menu.');
  document.querySelectorAll('ytd-topbar-menu-button-renderer')[2].click();
};

const isMenuOpen = () => {
  return (
    document.querySelector('iron-dropdown') &&
    !document.querySelector('iron-dropdown').getAttribute('aria-hidden')
  );
};

const isMenuLoading = () => {
  return !document.getElementById('spinner');
};

/**
 * Link arrow to dark theme popup.
 */
const isCompactLinkAvailableInDom = () => {
  return Boolean(
    document.querySelector('ytd-toggle-theme-compact-link-renderer'),
  );
};

const clickRenderer = () => {
  logStep('Click renderer');
  document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
};

const isRendererOpen = () => {
  return !(
    document.getElementById('submenu') &&
    Boolean(document.getElementById('submenu').hasAttribute('hidden'))
  );
};

const isRendererLoading = () => {
  return !(
    document.querySelector('#spinner.ytd-multi-page-menu-renderer') &&
    document
      .querySelector('#spinner.ytd-multi-page-menu-renderer')
      .hasAttribute('hidden')
  );
};

/**
 * Check theme menu.
 */
const isThemeMenuAvailableInDom = () => {
  return Boolean(
    document.querySelector('ytd-multi-page-menu-renderer > #submenu #container #sections #items > ytd-compact-link-renderer')
  );
};

/**
 * Toggle dark theme by clicking element in DOM.
 */
const toggleDarkTheme = () => {
  if (isCompactLinkAvailableInDom() && isThemeMenuAvailableInDom()) {
    logStep('Toggle dark theme.');
    document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
    document
      .querySelector(`ytd-multi-page-menu-renderer > #submenu #container #sections #items > ytd-compact-link-renderer:nth-of-type(${isDarkThemeEnabled() ? 4 : 3})`)
      .click();
  } else {
    logStep('Unable to toggle. Waiting longer.');
    setTimeout(() => {
      window.requestAnimationFrame(tryTogglingDarkMode);
    }, 50);
  }
};

/**
 * Wait for all elements to exist in DOM then toggle
 * Step 1: Wait for 3 dots menu in DOM.
 * Step 2: Click on 3 dots to open menu.
 * Step 3: Wait for menu to finish loading.
 * Step 4: Waiting for link to sub-menu (Should be optional now, because of step 3).
 * Step 5: Click to open sub-menu (renderer pane).
 * Step 6: Wait for sub-menu to finish loading.
 * Step 7: Toggle dark theme.
 * Step 8: Close menu.
 */
let start = null;
const tryTogglingDarkMode = timestamp => {
  // Compute runtime
  if (!start) {
    start = timestamp;
  }
  const runtime = timestamp - start;
  // Try to toggle only during 10s
  if (runtime < 10000) {
    if (!isMenuButtonAvailableInDom()) {
      logStep('Waiting for 3 dots menu.');
      setTimeout(() => {
        window.requestAnimationFrame(tryTogglingDarkMode);
      }, 50);
    } else if (!isMenuOpen()) {
      logStep('Menu is not open.');
      clickMenu();
      setTimeout(() => {
        window.requestAnimationFrame(tryTogglingDarkMode);
      }, 50);
    } else if (isMenuLoading()) {
      logStep('3 dots menu is loading.');
      setTimeout(() => {
        window.requestAnimationFrame(tryTogglingDarkMode);
      }, 50);
    } else if (isMenuOpen() && !isCompactLinkAvailableInDom()) {
      logStep('Loading menu, waiting for compact link.');
      setTimeout(() => {
        window.requestAnimationFrame(tryTogglingDarkMode);
      }, 50);
    } else if (!isRendererOpen()) {
      logStep('Renderer is not open.');
      clickRenderer();
      setTimeout(() => {
        window.requestAnimationFrame(tryTogglingDarkMode);
      }, 50);
    } else if (isRendererOpen() && isRendererLoading()) {
      logStep('Loading renderer.');
      setTimeout(() => {
        window.requestAnimationFrame(tryTogglingDarkMode);
      }, 50);
    } else {
      logStep('Should be able to toggle dark theme.');
      toggleDarkTheme();
      // console.log('Close renderer');
      // clickRenderer(); // Close dark theme menu
      if (isMenuOpen()) {
        logStep('Close menu.');
        clickMenu();
      }
    }
  } else {
    // Timeout with new activation process. Try the old one.
    setTimeout(() => {
      window.requestAnimationFrame(tryTogglingDarkModeTheOldWay);
    }, 50);
  }
};

/**
 * @Deprecated
 * Old way of doing things.
 * Kept here for backward compatibility.
 * Will be removed in a few month.
 */

/**
 * @Deprecated
 */
const openCloseMenu = () => {
  document.querySelectorAll('ytd-topbar-menu-button-renderer')[2].click();
  document.querySelectorAll('ytd-topbar-menu-button-renderer')[2].click();
};

/**
 * @Deprecated
 */
const openCloseRenderer = () => {
  document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
  document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
};

/**
 * @Deprecated
 */
let startOldWay = null;
const tryTogglingDarkModeTheOldWay = timestamp => {
  // Compute runtime
  if (!startOldWay) {
    startOldWay = timestamp;
  }
  const runtime = timestamp - startOldWay;
  // Try to toggle only during 5s
  if (runtime < 5000) {
    if (!isMenuButtonAvailableInDom()) {
      window.requestAnimationFrame(tryTogglingDarkMode);
    } else if (!isCompactLinkAvailableInDom()) {
      openCloseMenu();
      window.requestAnimationFrame(tryTogglingDarkMode);
    } else if (!isThemeMenuAvailableInDom()) {
      openCloseRenderer();
      window.requestAnimationFrame(tryTogglingDarkMode);
    } else {
      toggleDarkTheme();
      startOldWay = null;
    }
  }
};

const setDarkMode = on => {
  const isDarkModeOn = isDarkThemeEnabled();
  if (on) {
    if (!isDarkModeOn) {
      window.requestAnimationFrame(tryTogglingDarkMode);
    }
  } else if (isDarkModeOn) {
    window.requestAnimationFrame(tryTogglingDarkMode);
  }
};

/**
 * Error logger
 */
const logStorageErrorAndFallback = error => {
  console.error(`Error: ${error}`);
  window.requestAnimationFrame(tryTogglingDarkMode);
};

/**
 * Get settings and execute
 * Doc: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get
 */
const options = ['prefersColorScheme', 'timeBased', 'beforeHour', 'afterHour'];
browser.storage.sync.get(options).then(settings => {
  logStep(`Storage contains: ${JSON.stringify(settings)}`);
  if (window.matchMedia && settings.prefersColorScheme) {
    // if the browser/os supports system-level color scheme
    logStep('Follow system-level color scheme.');
    setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => setDarkMode(e.matches));
  } else if (settings.timeBased) {
    logStep('Use local time to decide.');
    let hour = new Date().getHours();
    setDarkMode(hour > settings.afterHour || hour < settings.beforeHour);
  } else {
    logStep('Default behavior.');
    setDarkMode(true);
  }
}, logStorageErrorAndFallback);
