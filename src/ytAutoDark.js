/* ytAutoDark. Automatically switch Youtube to its built-in dark theme.
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

const debug = false;
const logStep = message => {
  if (debug) {
    console.log(message);
  }
};

const isDarkThemeEnabled = () => {
  return Boolean(document.querySelector('html').hasAttribute('dark'));
};

/*
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
  return !(
    document.getElementById('spinner') &&
    Boolean(document.getElementById('spinner').getAttribute('aria-hidden'))
  );
};

/*
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

/*
 * Check toggle button.
 */
const isSwitchAvailableInDom = () => {
  return Boolean(
    document.querySelector('paper-toggle-button.ytd-toggle-item-renderer'),
  );
};

/*
 * Enable dark theme by clicking element in DOM.
 */
const switchToDarkTheme = () => {
  if (isCompactLinkAvailableInDom() && isSwitchAvailableInDom()) {
    logStep('Switch to dark theme.');
    document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
    document
      .querySelector('paper-toggle-button.ytd-toggle-item-renderer')
      .click();
  } else {
    logStep('Unable to switch. Waiting longer.');
    setTimeout(() => {
      window.requestAnimationFrame(trySwitchingToDark);
    }, 500);
  }
};

/*
 * Wait for all elements to exist in DOM then switch
 * Step 1: Wait for 3 dots menu in DOM.
 * Step 2: Click on 3 dots to open menu.
 * Step 3: Wait for menu to finish loading.
 * Step 4: Waiting for link to sub-menu (Should be optional now, because of step 3).
 * Step 5: Click to open sub-menu (renderer pane).
 * Step 6: Wait for sub-menu to finish loading.
 * Step 7: Switch to dark theme.
 * Step 8: Close menu.
 */
let start = null;
const trySwitchingToDark = timestamp => {
  // If already dark, do nothing
  if (isDarkThemeEnabled()) {
    logStep('Dark theme activated !');
    return;
  }

  // Compute runtime
  if (!start) {
    start = timestamp;
  }
  const runtime = timestamp - start;
  // Try to switch only during 15s
  if (runtime < 15000) {
    if (!isMenuButtonAvailableInDom()) {
      logStep('Waiting for 3 dots menu.');
      setTimeout(() => {
        window.requestAnimationFrame(trySwitchingToDark);
      }, 500);
    } else if (!isMenuOpen()) {
      logStep('Menu is not open.');
      clickMenu();
      setTimeout(() => {
        window.requestAnimationFrame(trySwitchingToDark);
      }, 500);
    } else if (isMenuLoading()) {
      logStep('3 dots menu is loading.');
      setTimeout(() => {
        window.requestAnimationFrame(trySwitchingToDark);
      }, 500);
    } else if (isMenuOpen() && !isCompactLinkAvailableInDom()) {
      logStep('Loading menu, waiting for compact link.');
      setTimeout(() => {
        window.requestAnimationFrame(trySwitchingToDark);
      }, 500);
    } else if (!isRendererOpen()) {
      logStep('Renderer is not open.');
      clickRenderer();
      setTimeout(() => {
        window.requestAnimationFrame(trySwitchingToDark);
      }, 500);
    } else if (isRendererOpen() && isRendererLoading()) {
      logStep('Loading renderer.');
      setTimeout(() => {
        window.requestAnimationFrame(trySwitchingToDark);
      }, 500);
    } else {
      logStep('Should be able to switch to dark theme.');
      switchToDarkTheme();
      // console.log('Close renderer');
      // clickRenderer(); // Close dark theme menu
      if (isMenuOpen()) {
        logStep('Close menu.');
        clickMenu();
      }
    }
  }
};

/*
 * Execute
 */
window.requestAnimationFrame(trySwitchingToDark);
