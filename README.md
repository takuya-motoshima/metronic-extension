# metronic-extension
Extension package for the Metronic WEB theme.

- [metronic-extension](#metronic-extension)
  - [Documentation](#documentation)
  - [Installation](#installation)
  - [How to start the demo with Docker](#how-to-start-the-demo-with-docker)
  - [Release Notes](#release-notes)
  - [Testing](#testing)
  - [Author](#author)
  - [License](#license)

## Documentation
Metronic Extension documentation can be found [here](https://takuya-motoshima.github.io/metronic-extension/).

## Installation
```sh
npm i metronic-extension
```

## How to start the demo with Docker
See [here](demo/README.md).

## Release Notes
All changes can be found [here](CHANGELOG.md).

- [3.0.15] - 2025/1/31
    - Changes to Tagify Component Styling (see demo [here](https://takuya-motoshima.github.io/metronic-extension/tagify#single-value-select)):
        - Removed unnecessary margin below the input field in single select mode.
        - Increased the opacity of the toggle button in single select mode for better visibility.
        - Made the background of the remove button for selected tags transparent in single select mode.
        - Darkened the color of the tag removal button for better visibility. 
- [3.0.14] - 2025/1/7
    - Added `setDisabled` method and a reference to the Tagify instance to the Tagify component.
        ```js
        // Disable input.
        tagify.setDisabled(true);

        // Reset the whitelist using the Tagify instance API.
        tagify.api.whitelist = null;
        ```
- [3.0.13] - 2024/12/31
    - Fixed a bug where the data table loading indicator was not displayed when the locale option was set to Japanese.
- [3.0.12] - 2024/12/31
    - Fixed a bug where the data table loading indicator was not displayed.
- [3.0.11] - 2024/12/27
    - Added responsive support for subtables. You can check the updated subtable [here](https://takuya-motoshima.github.io/metronic-extension/datatable.html#subtable).
    - Added an example to the subtable demo where the expand button is not displayed for rows without subtable data.

## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)