# Changelog

## 3.0.1 (2020-07-25)

### Added
- Add webextension-polyfill for Chrome compatibility.

## 3.0.0 (2020-07-25)

### Added
- Add prefers-color-scheme toggle setting.
- Add time base toggle setting.
- Use sync storage to store settings.
- Add install/update page. Will be displayed only on installation or when updating to a major version starting with 3.0.0.
- I18n all new content.
- Add helpers functions to insert i18n content into document.

### Changed
- Split code into multiple files.

### Fixed
- Bump lodash from 4.17.15 to 4.17.19.

## 2.1.0 (2020-07-20)

### Changed
- Toggle dark mode based on system theme or local time

## 2.0.0 (2020-04-28)

### Added
- Log messages to be able to follow activation steps and ease debugging during development.
  Should not be activate in production.

### Changed
- Will try to switch theme during 15s rather than 10s before giving up.

### Fixed
- Menu was not being closed anymore with v1.1.3, because Youtube deployed a new code.

## 1.1.3 (2020-01-27)
### Added
- ``short_name`` property in manifest.
- Locales: en + fr
- Screenshots

### Changed
- Change name.

## 1.1.2 (2020-01-26)
### Added
- Icon 16x16, 32x32 and 128x128.

### Changed
- Remove text from icon and add a border.

## 1.1.1 (2020-01-16)
### Changed
- Taller extension name on icon.

### Fixed
- Fix icons path.

## 1.1.0 (2020-01-15)
### Added
- Add a changelog.
- Add ``homepage_url`` property.
- Add icons.

### Changed
- Uppercase first letter in name.

## 1.0.0 (2020-01-15)
### Added
- Set ``strict_min_version`` property to 60.0.

## 0.0.3 (2019-08-30)
Initial version published.
