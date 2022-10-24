# Changelog
All notable changes to this project will be documented in this file.

## [1.0.2] - 2022/10/24
### Fixed
- Add request error hook method to API class.
    ```js
    import {Api} from 'metronic-extension';

    export default class extends Api {
      requestErrorHook(code) {
        if (code === 403) {
          // Redirect in case of authentication error (403).
          alert('The session has expired');
          location.replace('/');
        }
      }
    }
    ```
- Added request error hook method to Datatable class.
    ```js
    import {Datatable} from 'metronic-extension';

    export default class extends Datatable {
      requestErrorHook(code) {
        if (code === 403) {
          // Redirect in case of authentication error (403).
          alert('The session has expired');
          location.replace('/');
        }
      }
    }
    ```
- Fix to prevent tooltip elements from being double instantiated. (src/components/initTooltip.ts)


## [1.0.1] - 2022/10/20
### Fixed
- Removed boostrap from this package which conflicts with metronic's bootstrap.

## [1.0.0] - 2022/10/17
### Fixed
- Released.

[1.0.1]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.1...v1.0.2