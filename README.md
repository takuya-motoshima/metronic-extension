# metronic-extension
Extension package for the Metronic WEB theme.

## Documentation
Metronic Extension V3 documentation can be found [here](https://takuya-motoshima.github.io/metronic-extension/v3/).

If you are using Metronic Extension V2, please see the documentation [here](https://takuya-motoshima.github.io/metronic-extension/v2/).

## Installation
```sh
npm install --save metronic-extension
```

## Release Notes
All changes can be found [here](CHANGELOG.md).

- [3.0.4] - 2024/2/8
    - Added file input name attribute option to the image input component (`components.ImageInput`).  
        ```js
        import {components} from 'metronic-extension';
        
        new components.ImageInput(document.getElementById('imageInput'), {
        name: 'image'
        });
        ```
    - Theme documentation now offers a choice of three themes.
        - Light  
            <img src="screencaps/light-theme.jpg" width="300">
        - Dark  
            <img src="screencaps/dark-theme.jpg" width="300">
        - System  
            <img src="screencaps/system-theme.jpg" width="300">
- [3.0.3] - 2023/12/27
    - Line chart component added. See [here](https://takuya-motoshima.github.io/metronic-extension/v3/linechart.html) how to use it.
    
        ![line-chart.jpg](screencaps/line-chart.jpg)
- [3.0.2] - 2023/11/20
    - The `dataFormatter` (axis label format) option in `BarChart` has been removed.  
        Use the `xAxisFormatter` (X axis label format) and `yAxisFormatter` (Y axis label format) options instead.
- [3.0.1] - 2023/11/20
    - Fixed a bug that the parameters specified in the `data` option of `BarChart` and `PieChart` were not sent to the server.
- [3.0.0] - 2023/11/10
    - Version 3 has a clearer namespace.  
        If you are updating from version 2 to 3, please change the Import statement.  

        See the [change history](CHANGELOG.md) for details.

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