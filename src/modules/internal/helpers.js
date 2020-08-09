/**
 * Helpers
 * Inspired by dcentraleyes.
 * https://git.synz.io/Synzvato/decentraleyes/-/blob/master/modules/internal/helpers.js
 */

let helpers = {};

/**
 * Public Methods
 */

helpers.insertI18nContentIntoDocument = function (document) {
  let i18nElements = document.querySelectorAll('[data-i18n-content]');

  i18nElements.forEach(function (i18nElement) {
    let i18nMessageName = i18nElement.getAttribute('data-i18n-content');

    i18nElement.innerText = chrome.i18n.getMessage(i18nMessageName);
  });
};

helpers.insertI18nTitlesIntoDocument = function (document) {
  let i18nElements = document.querySelectorAll('[data-i18n-title]');

  i18nElements.forEach(function (i18nElement) {
    let i18nMessageName = i18nElement.getAttribute('data-i18n-title');

    i18nElement.setAttribute('title', chrome.i18n.getMessage(i18nMessageName));
  });
};

helpers.isLanguageFullySupported = function (language) {
  let languageSupported, supportedLanguages;

  languageSupported = false;

  supportedLanguages = ['en', 'fr'];

  for (let supportedLanguage of supportedLanguages) {
    if (language.search(supportedLanguage) !== -1) {
      languageSupported = true;
    }
  }

  return languageSupported;
};
