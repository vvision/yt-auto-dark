/* ytAutoDark. Automatically switch Youtube to its built-in dark theme.
 * Copyright (C) 2019  Victor VOISIN

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

const isDarkThemeEnabled = () => {
  return Boolean(document.querySelector('html').hasAttribute('dark'));
};

/*
 * Three dot menu button.
 */
const isMenuButtonAvailableInDom = () => {
  return Boolean(document.querySelectorAll('ytd-topbar-menu-button-renderer')[2]);
};

const openCloseMenu = () => {
  document.querySelectorAll('ytd-topbar-menu-button-renderer')[2].click();
  document.querySelectorAll('ytd-topbar-menu-button-renderer')[2].click();
};

/*
 * Link arrow to dark theme popup.
 */
const isCompactLinkAvailableInDom = () => {
  return Boolean(document.querySelector('ytd-toggle-theme-compact-link-renderer'));
};

const openCloseRenderer = () => {
  document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
  document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
};

/*
 * Check toggle button.
 */
const isSwitchAvailableInDom = () => {
  return Boolean(document.querySelector(
    'paper-toggle-button.ytd-toggle-item-renderer',
  ));
};

/*
 * Enable dark theme by clicking element in DOM.
 */
const switchToDarkTheme = () => {
  if (isCompactLinkAvailableInDom() && isSwitchAvailableInDom()) {
    document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
    document
      .querySelector('paper-toggle-button.ytd-toggle-item-renderer')
      .click();
  }
};

/*
 * Wait for all elements to exist in DOM then switch
 */
let start = null;
const trySwitchingToDark = (timestamp) => {
  // If already dark, do nothing
  if (isDarkThemeEnabled()) {
    return;
  }

  // Compute runtime
  if (!start) {
    start = timestamp;
  }
  const runtime = timestamp - start;
  // Try to switch only during 10s
  if(runtime < 10000) {
    if (!isMenuButtonAvailableInDom()) {
      window.requestAnimationFrame(trySwitchingToDark);
    } else if (!isCompactLinkAvailableInDom()) {
      openCloseMenu();
      window.requestAnimationFrame(trySwitchingToDark);
    } else if (!isSwitchAvailableInDom()) {
      openCloseRenderer();
      window.requestAnimationFrame(trySwitchingToDark);
    } else {
      switchToDarkTheme();
    }
  }
};

/*
 * Execute
 */
window.requestAnimationFrame(trySwitchingToDark);
