# Changelog
All notable changes to this project will be documented in this file.

## [2.0.16] - 2023/6/30
### Fixed
- Fixed a bug in the Date range picker initialization function (initDatepicker) where the locale option was not applied.

## [2.0.15] - 2023/6/29
### Changed
- Added new option to Date Range Picker initialization method.
  - maxDays:  
    Maximum number of days that can be selected. Default is indefinite (undefined).

## [2.0.14] - 2023/6/28
### Changed
- Added new option to Date Range Picker initialization method.
  - autoUpdateInput:  
    Indicates whether the date range picker should automatically update the value of the &lt;input&gt; element it&#039;s attached to at initialization and when the selected dates change. Default is true.
  - format:  
    Date Format. Default is &#039;YYYY/M/D&#039;.

## [2.0.13] - 2023/6/2
### Changed
- Added auto-scroll option (shouldFocus: boolean) for invalid elements to form validation.  
    The default value of the option is true.
    ```js
    import {Validation} from 'metronic-extension';

    // Automatically validate the form when pressing its Submit button.
    const enableSubmitTrigger = true;

    // Stop performing remaining validators if there is a validator that the field does not pass.
    const enableSequence = true;

    // Scroll to invalid element on submit.
    const shouldFocus = true;
    const validation = new Validation(document.getElementById('myForm'), {
      username: {
        validators: {
          notEmpty: {
            message: 'The username is required'
          },
        }
      }
    }, enableSubmitTrigger, enableSequence, shouldFocus);
    ```

## [2.0.12] - 2023/6/1
### Changed
- Added tree refresh and node refresh methods to the tree class.
    - Tree Refresh API.  
        Syntax:  
        ```js
        refresh(skipLoading: boolean = false, forgetState: boolean = true): Tree
        ```

        Parameters:  
        - skipLoading: An option to skip showing the loading indicator. Default is false.
        - forgetState: If set to true state will not be reapplied, if set to a function (receiving the current state as argument) the result of that function will be used as state. Default is false.

        Return:  
        - Tree instance.
    - Node refresh API.  
        Syntax:  
        ```js
        refreshNode(obj: any): Tree
        ```

        Parameters:  
        - obj: The node.

        Return:  
        - Tree instance.

## [2.0.11] - 2023/5/30
### Changed
- Added a method for renaming nodes to the tree class.
    ```js
    import {Tree} from 'metronic-extension';

    // Initialize the tree.
    const tree = new Tree(document.querySelector('#tree'));

    // Get the currently selected node.
    const node = tree.getSelectedNode();

    // Rename node.
    tree.renameNode(node, 'New Name');
    ```

## [2.0.10] - 2023/5/29
### Fixed
- Fixed a bug in the tree class where the node ID received by the file node selection event handler immediately after creation was incorrect.

## [2.0.9] - 2023/5/29
### Changed
- Tree class folder and file creation API now returns an error if the response data does not have the ID of the created node.
- Added file creation hook function to the tree class.  
    Hooks can be used to incorporate your own file creation logic.  

    This is an example of file creation on a modal.  
    Refer to the modal code [here](demo/client/src/modals/NodeCreateModal.js).
    ```js
    import {Tree} from 'metronic-extension';
    import NodeCreateModal from '~/modals/NodeCreateModal';

    // File creation modal.
    const nodeCreateModal = new NodeCreateModal();

    // Initialize the tree.
    const tree = new Tree(document.querySelector('#tree'));
    tree.onCreateFileHook(async parent => {
      // Create a new file on the modal.
      // NOTE:If a node is created, the ID and text of the created node must be returned.
      //      If the creation of a node is canceled, a false value (null, false, undefined) should be returned.
      return await nodeCreateModal.show(parent.id);
    });
    ```

    ![tree-folder-creation-hook.png](screencaps/2.0.9/tree-folder-creation-hook.png)

## [2.0.8] - 2023/5/26
### Changed
- Added ready event to Tree class.  
    This event is triggered when all nodes have been loaded and the previously selected node's selection state has been restored.
    ```js
    import {Tree} from 'metronic-extension';

    const tree = new Tree(document.querySelector('#tree'));
    tree.onReady(evnt => {
      console.log('ready event fires.');
    });
    ```

## [2.0.7] - 2023/5/25
### Changed
- Added functionality to the tree class.  
    - Added an event that is called immediately after node information is fetched from the server.  
        It takes the fetched node data as a parameter.
        ```js
        import {Tree} from 'metronic-extension';

        const tree = new Tree(document.querySelector('#tree'));
        tree.onFetch(nodeData => {
          console.log(nodeData);
          // {
          //   children: true,
          //   id: 1,
          //   parent: "#",
          //   text: "Root node",
          //   type: "folder"
          // }
        });
        ```
    - Get an array of all selected nodes.  
        Syntax:  
        ```js
        getSelectedNodes(full: boolean = true, index?: number): any|null
        ```

        Parameters:  
        - full: if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned.
        - index: Index of the node to be acquired. Default is none and all nodes are retrieved.

        Return:  
        - Returns an array of selected nodes.

        Example:  
        ```js
        import {Tree} from 'metronic-extension';

        const tree = new Tree(document.querySelector('#tree'));
        const nodes = tree.getSelectedNodes();
        ```
    - Get the first selected node.  
        Syntax:  
        ```js
        getSelectedNode(full: boolean = true): any|null
        ```

        Parameters:  
        - full: if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned.

        Return:  
        - Returns selected nodes.

        Example:  
        ```js
        import {Tree} from 'metronic-extension';

        const tree = new Tree(document.querySelector('#tree'));
        const node = tree.getSelectedNode();
        ```

## [2.0.6] - 2023/5/25
### Changed
- Added node type options (options.nodeTypes) to the folder tree.
    HTML:
    ```html
    <!--begin::Tree-->
    <div data-ref="tree"></div>
    <!--end::Tree-->
    ```

    JS:
    ```js
    import {selectRef, Tree} from 'metronic-extension';

    const ref = selectRef();
    const tree = new Tree(ref.tree, {
      /**
      * Options per node type.
      * @type {object}
      */
      nodeTypes: {
        /**
        * Folder node options.
        */
        folder: {
          // Folder node identifier.
          type: 'folder',

          // Folder node icons. Default is 'fa fa-folder text-warning'.
          icon: 'fa fa-folder text-warning',
        },
        /**
        * File node options.
        */
        file: {
          // File node identifier.
          type: 'file',

          // File node icons. Default is 'fa fa-file text-white'.
          icon: 'fa-solid fa-computer text-white',
        },
      },
      api: {
        getChildren: '/api/folders/_PARENT_FOLDER_ID_/children',
        createFolder: '/api/folders/_PARENT_FOLDER_ID_',
        deleteFolder: '/api/folders/_CURRENT_FOLDER_ID_',
        renameFolder: '/api/folders/_CURRENT_FOLDER_ID_',
        createFile: '/api/files/_PARENT_FOLDER_ID_',
        deleteFile: '/api/files/_CURRENT_FILE_ID_',
        renameFile: '/api/files/_CURRENT_FILE_ID_',
      },
    });
    ```

    ![tree.png](screencaps/2.0.6/tree.png)

## [2.0.5] - 2023/3/26
### Changed
- Changed the return value of the reload method of Datatable from <code>void</code> to <code>Promise&lt;any&gt;</code>.  
    You can use await to wait until after the data has been reloaded and the table has been completely redrawn.  
    Promise returns JSON data that will be returned by the server.
    ```js
    const myDatatable = new Datatable(ref.myDatatable);

    // Reload while maintaining the current page position.
    let resetPaging = false;
    const json = await myDatatable.reload(resetPaging);

    // Reload with the current page position back to the first page.
    resetPaging = true;
    const json = await myDatatable.reload(resetPaging);
    ```

## [2.0.4] - 2023/3/26
### Changed
- Fixed a typo in the change log.

### Added
- Added a method to clear all rows to the Datatable class.
    ```js
    const myDatatable = new Datatable(ref.myDatatable);

    // All rows are cleared.
    myDatatable.clear();
    ```
- Add getter for DataTables API object to Datatable class.
    ```js
    const myDatatable = new Datatable(ref.myDatatable);

    // Object of the DataTables API.
    myDatatable.api;
    ```

## [2.0.3] - 2023/3/15
### Added
- Added option to show Cancel button in Success dialog.
    Also, the return value of the success dialog has been fixed to return true if the OK button is clicked and false if the Cancel button is clicked.  
    The cancel button is not shown by default (showCancelButton: false).

    Example:
    ```js
    import {Dialog} from 'metronic-extension';

    // Show success dialog with cancel button.
    const res = await Dialog.success('Here\'s a basic example of success dialog!', {
      showCancelButton: true,
      cancelButtonText: 'Cancel',
    });
    ```
    ![success-dialog-with-cancel-button.png](screencaps/2.0.3/success-dialog-with-cancel-button.png)

## [2.0.2] - 2023/3/7
### Added
- Added an option to the constructor of the form validation class to stop execution of the remaining validators if a field has validators that do not pass.  
    Default is enabled.
    
    Example:
    ```js
    import {Validation} from 'metronic-extension';

    // Automatically validate the form when pressing its Submit button.
    const enableSubmitTrigger = true;

    // Stop performing remaining validators if there is a validator that the field does not pass.
    const enableSequence = true;
    const validation = new Validation(document.getElementById('myForm'), {
      username: {
        validators: {
          notEmpty: {
            message: 'The username is required'
          },
        }
      }
    }, enableSubmitTrigger, enableSequence);
    ```

## [2.0.1] - 2023/3/6
### Changed
- Added axios.create option to the Rest client class constructor as a parameter.  
    The default values of the options are as follows.
    ```js
    {
      baseURL: 'The value of the location.origin+path parameter or the origin parameter+path parameter.',
      timeout: 60000,
      responseType: 'json',
      withCredentials: true,
    }
    ```

    Syntax:
    ```js
    import {Api} from 'metronic-extension';

    class ExampleApi extends Api {
      constructor() {
        super('/api/users');
      }
    }

    class ExampleApi extends Api {
      constructor() {
        super('/api/users', 'example.com');
      }
    }

    class ExampleApi extends Api {
      constructor() {
        super('/api/users', 'example.com', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
        });
      }
    }
    ```

    Type of axios.create option:
    ```js
    export interface AxiosRequestConfig<D = any> {
      url?: string;
      method?: Method | string;
      baseURL?: string;
      transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
      transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
      headers?: RawAxiosRequestHeaders;
      params?: any;
      paramsSerializer?: ParamsSerializerOptions;
      data?: D;
      timeout?: Milliseconds;
      timeoutErrorMessage?: string;
      withCredentials?: boolean;
      adapter?: AxiosAdapter;
      auth?: AxiosBasicCredentials;
      responseType?: ResponseType;
      responseEncoding?: responseEncoding | string;
      xsrfCookieName?: string;
      xsrfHeaderName?: string;
      onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
      onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
      maxContentLength?: number;
      validateStatus?: ((status: number) => boolean) | null;
      maxBodyLength?: number;
      maxRedirects?: number;
      maxRate?: number | [MaxUploadRate, MaxDownloadRate];
      beforeRedirect?: (options: Record<string, any>, responseDetails: {headers: Record<string, string>}) => void;
      socketPath?: string | null;
      httpAgent?: any;
      httpsAgent?: any;
      proxy?: AxiosProxyConfig | false;
      cancelToken?: CancelToken;
      decompress?: boolean;
      transitional?: TransitionalOptions;
      signal?: GenericAbortSignal;
      insecureHTTPParser?: boolean;
      env?: {
        FormData?: new (...args: any[]) => object;
      };
      formSerializer?: FormSerializerOptions;
    }
    ```

## [2.0.0] - 2023/2/27
### Changed
- Updated Metronic version from 8.1.2 to 8.1.7.  
    - With the version upgrade, the theme attribute name for demo and docs has been changed from "data-theme" to "data-bs-theme".  
        ```html
        <html lang="en" data-bs-theme="dark">
        ```
    - The CSS variable prefix has been changed from "--kt-" to "--bs-" with the version upgrade.
- Fix to remove demo/public/build before demo webpack build.  
    demo/client/package.json:
    ```json
    "scripts": {
      "prebuild": "rimraf ../public/build",
      "prebuild:dev": "rimraf ../public/build",
      "prewatch": "rimraf ../public/build",
      "prewatch:dev": "rimraf ../public/build"
    },
    ```

## [1.0.23] - 2023/2/16
### Changed
- Fix [demo](https://takuya-motoshima.github.io/metronic-extension/) available on github.io.
    ![index.png](demo/client/src/media/demos/index.png)

### Added
- Added tree component.
    HTML:
    ```html
    <!--begin::Tree-->
    <div data-ref="tree"></div>
    <!--end::Tree-->
    ```

    JS:
    ```js
    import {selectRef, Tree} from 'metronic-extension';

    const ref = selectRef();
    const tree = new Tree(ref.tree, {
      folderMaxlen: 20,
      fileMaxlen: 20,
      api: {
        getChildren: '/api/folders/_PARENT_FOLDER_ID_/children',
        createFolder: '/api/folders/_PARENT_FOLDER_ID_',
        deleteFolder: '/api/folders/_CURRENT_FOLDER_ID_',
        renameFolder: '/api/folders/_CURRENT_FOLDER_ID_',
        createFile: '/api/files/_PARENT_FOLDER_ID_',
        deleteFile: '/api/files/_CURRENT_FILE_ID_',
        renameFile: '/api/files/_CURRENT_FILE_ID_',
      },
    });
    tree
      .onSelected((evnt, node) => {
        alert(`Selected node.
          id: ${node.id}
          path: ${tree.getPath(node, '/')}
          text: ${node.text}
          type: ${node.type}`);
      })
      .onError(err => {
        alert(err.message);
      });
    ```
    ![tree.png](demo/client/src/media/demos/tree.png)
- Added a function to check if a variable is a function type.
    ```js
    import {isFunction} from 'metronic-extension';

    isFunction(function () {}); // true
    isFunction(() => {});       // true
    isFunction(setTimeout);     // true
    isFunction(123);            // false
    isFunction("foo");          // false
    isFunction(null);           // false
    isFunction(undefined);      // false
    isFunction(true);           // false
    isFunction(false);          // false
    ```

## [1.0.22] - 2023/1/30
### Changed
- Changed the default value of the reset page of the reload method of the data table component from true to false.

## [1.0.21] - 2023/1/30
### Changed
- Added a page reset parameter to the reload method of the Datatable component.  
    The default value for page reset is true.
    ```js
    const myDatatable = new Datatable(ref.myDatatable);

    // Reload. Page position after reload is 1.
    myDatatable.reload(true);

    // Reload the page while maintaining the current page position.
    myDatatable.reload(false);
    ```

## [1.0.20] - 2023/1/24
### Added
- Add column reference methods to DataTable class (Datatable.column(columnSelector: any, modifier?: DataTables.ObjectSelectorModifier): DataTables.ColumnMethods).
    HTML:
    ```html
    <table data-ref="myDatatable" class="table table-row-bordered gy-5">
      <thead>
        <tr class="fw-semibold fs-6 text-muted">
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    ```

    JS:
    ```js
    const myDatatable = new Datatable(ref.myDatatable);

    // Hide the second column.
    myDatatable.column(1).visible(false);
    ```

## [1.0.19] - 2023/1/23
### Added
- Added example of data table switching column visibility.  
    See the DataTable section of [this page](https://takuya-motoshima.github.io/metronic-extension/) for a demonstration.  
    ![colvis-datatable.png](screencaps/1.0.19/colvis-datatable.png)

    HTML:
    ```html
    <table data-ref="myDatatable" class="table table-row-bordered gy-5">
      <thead>
        <tr class="fw-semibold fs-6 text-muted">
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    ```

    JS:
    ```js
    import {Datatable, selectRef} from 'metronic-extension';

    function initDatatable() {
      new Datatable(ref.myDatatable, {
        ajax: {
          url: 'http://localhost:8080/api/persons'
        }
        dom: `<'row align-items-center'<'col-auto'B><'col dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
        columnDefs: [
          {targets: 0, data: 'name'},
          {targets: 1, data: 'position'},
          {targets: 2, data: 'office'},
          {targets: 3, data: 'age'},
          {targets: 4, data: 'startDate'},
          {targets: 5, data: 'salary'}
        ],
        buttons: [
          {
            extend: 'colvis',
            text: 'Show / hide columns',
            // Columns selector that defines the columns to include in the column visibility button set.
            // CSS selectors, column indexes, etc. can be used to specify columns to switch visibility.
            columns: ':eq(1),:eq(2),:eq(3),:eq(4)',
            // columns: [1,2,3,4],
          }
        ],
        stateSave: true,// Save the column visibility in the browser.
        stateSaveParams: (_, data) => {
          // Remove items not to be saved in the browser.
          delete data.length;
          delete data.order;
          delete data.paging;
          delete data.scroller;
          delete data.search;
          delete data.searchBuilder;
          delete data.searchPanes;
          delete data.select;
        }
      });
    }

    const ref = selectRef();
    initDatatable();
    ```

## [1.0.18] - 2023/1/10
### Changed
- The bootstrap tooltip setup function (initTooltip) now returns a tooltip object (bootstrap.Tooltip[]).

## [1.0.17] - 2023/1/8
### Changed
- Fixed an error that occurred in the process of extending the ajax option of a DataTable when the ajax option is a URL string.

## [1.0.16] - 2023/1/8
### Fixed
- Fixed a bug that prevented importing ESM modules directly without using the bundling tool as follows.
    ```js
    import * as extension from './node_modules/metronic-extension/dist/build.esm.js';
    ```

## [1.0.15] - 2022/11/24
### Changed
- Added an event handler to the Dropzone component that fires when a selected file is canceled.
    HTML:
    ```html
    <h1 id="dropzone">Dropzone</h1>
    ```

    JS:
    ```js
    import {Dropzone} from 'metronic-extension';
    const dropzone = new Dropzone(document.getElementById('dropzone'));
    dropzone
      .onAddFile(file => {
        alert(`From additional handlers. Select "${file.name}"`);
      })
      .onCancelFile(() => {
        alert('Canceled file selection');
      });
    ```

## [1.0.14] - 2022/11/21
### Changed
- Added a method to the modal class to determine if the modal is currently visible (Modal#isShowing(): boolean).
    ```js
    import {Modal} from 'metronic-extension';

    class DemoModal extends Modal {
      init() {
        const node = this.#render();
        const instance = new bootstrap.Modal(node);
        return [node, instance];
      }

      #render() {
        return $(
          `<div class="modal fade" tabindex="-1" aria-hidden="true">
            <!--begin::Modal dialog-->
            <div class="modal-dialog modal-dialog-centered mw-650px">
              <!--begin::Modal content-->
              <div class="modal-content">
                <!--begin::Modal header-->
                <div class="modal-header">
                  <!--begin::Modal title-->
                  <h2>Demo Modal</h2>
                  <!--end::Modal title-->
                  <!--begin::Close-->
                  <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                    <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                    <span class="svg-icon svg-icon-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                      <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                    </svg></span>
                    <!--end::Svg Icon-->
                  </div>
                  <!--end::Close-->
                </div>
                <!--end::Modal header-->
                <!--begin::Modal body-->
                <div class="modal-body py-lg-10 px-lg-10">Hello, world</div>
                <!--end::Modal body-->
                <!--begin::Modal footer-->
                <div class="modal-footer">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                </div>
                <!--end::Modal footer-->
              </div>
              <!--end::Modal content-->
            </div>
            <!--end::Modal dialog-->
          </div>`).appendTo('body');
      }
    }

    const demoModal = new DemoModal();
    demoModal.isShowing();// =>false
    demoModal.show();
    demoModal.isShowing();// =>true
    ```

## [1.0.13] - 2022/11/18
### Changed
- The default and current images for the image input component (ImageInput) options can now be initially set with the data attribute.  
    HTML:
    ```html
    <div id="imageInput"
      data-image-input-current="img/current.jpg"
      data-image-input-default="img/default.jpg"></div>
    <input type="hidden" id="selectedImageDataUrl">
    ```

    JS:
    ```js
    import {ImageInput} from 'metronic-extension';

    const imageInput1 = new ImageInput(document.getElementById('imageInput'), {
      // The current and default image is specified by the data attribute. Of course, you can optionally specify it.
      // current: 'img/current.jpg',
      // default: 'img/default.jpg',
      hiddenEl: document.getElementById('selectedImageDataUrl'),
      language: {
        change: 'Change',
        remove: 'Delete',
        cancel: 'Cancel change'
      }
    });
    ```

## [1.0.12] - 2022/11/18
### Changed
- Added support for build scripts on Windows OS.

### Fixed
- Fixed a bug that the DataURL of the current image specified in the image input component (ImageInput.ts) was not set to the hidden element.

## [1.0.11] - 2022/11/17
### Added
- Add a component to toggle password visibility (initShowPasswordToggle).  
    The component is applied to input elements with the &quot;[data-show-password-toggle=&quot;true&quot;]&quot; attribute.  
    ![password-show-toggle.png](screencaps/1.0.11/password-show-toggle.png)

    HTML:
    ```html
    <!--begin::Input group-->
    <div class="d-flex flex-column mb-7 fv-row">
      <!--begin::Label-->
      <label class="required fs-6 fw-bolder mb-2">Password</label>
      <!--end::Label-->
      <!--begin::Input group-->
      <div class="input-group input-group-solid">
        <!--begin::Input-->
        <input id="input" data-show-password-toggle="true" class="form-control" type="password" placeholder="Enter password..." />
        <!--end::Input-->
        <!--begin::Button-->
        <button type="button" class="btn btn-icon btn-light"></button>
        <!--end::Button-->
      </div>
      <!--end::Input group-->
    </div>
    <!--begin::Input group-->
    ```

    JS:
    ```js
    import {initShowPasswordToggle} from 'metronic-extension';

    initShowPasswordToggle(document.getElementById('input'));
    
    //  or context is specified, the component is applied to the target of the child element.
    initShowPasswordToggle(document.body);
    ```

## [1.0.10] - 2022/11/15
### Added
- Added a tag change event (fired when a tag is added or removed) to the Tagify component.
    HTML:
    ```html
    <input id="tagify" class="form-control" value="tag1,tag2,tag3" />
    ```

    JS:
    ```js
    import {Tagify} from 'metronic-extension';
    const tagify = new Tagify(document.getElementById('tagify'), {
      whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
      dropdown: {maxItems: 20}
    });
    tagify
      .onAddTag(evnt => alert('Add tags'))
      .onRemoveTag(evnt => alert('Delete tag'))
      .onChangeTag(evnt => alert('Change (add or remove) a tag'));
    ```

## [1.0.9] - 2022/11/14
### Added
- Added Dropzone component.
    ![dropzone.png](screencaps/1.0.9/dropzone.png)

## [1.0.8] - 2022/11/14
### Changed
- Add docs/ to .npmignore.

## [1.0.7] - 2022/11/14
### Fixed
- Remove node_modules in docs that were accidentally included in the package.

## [1.0.6] - 2022/11/14
### Added
- Add Tagify (src/components/Tagify) component.
    ![tagify.png](screencaps/1.0.6/tagify.png)

## [1.0.5] - 2022/10/24
###  Added
- Added Japanese phone number custom validation to form validation.  
    HTML:
    ```html
    <!--begin::Form-->
    <form data-ref="form" autocomplete="off">
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="fw-semibold fs-6 mb-2">Integer from 1 to 99</label>
        <!--end::Label-->
        <!--begin::Input-->
        <input name="betweenValues" class="form-control" placeholder="99" value="99">
        <!--end::Input-->
      </div>
      <!--end::Input group-->
      <!--begin::Actions-->
      <button type="submit" class="btn btn-primary">Validation Form</button>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
    ```

    JS:
    ```js
    import {Validation} from 'metronic-extension';

    const validation = new Validation(document.getElementById('myForm'), {
      betweenValues: {
        validators: {
          isIntegersBetween: {
            message: 'This is not correct.',
            min: 1,
            max: 99
          }
        }
      }
    });
    validation.onValid(() => {
      alert('Form has been successfully submitted!');
    });
    ```

## [1.0.4] - 2022/10/24
### Added
- Added event handler that fire when each field is valid or invalid.
    ```js
    import {Validation} from 'metronic-extension';

    const validation = new Validation(document.getElementById('demoForm'), {
      userName: {
        validators: {
          notEmpty: {message: 'Enter here.'}
        }
      }
    });
    validation
      .onValid(async () => {
        // All fields are valid.
      })
      .onFieldValid(name => {
        console.log(`${name} field is valid`);
        // =>userName field is valid
      })
      .onFieldInvalid(name => {
        console.log(`${name} field is invalid`);
        // =>userName field is invalid
      });
    ```
- Add a method to immediately validate the specified field.
    ```js
    import {Validation} from 'metronic-extension';

    const validation = new Validation(document.getElementById('demoForm'), {
      userName: {
        validators: {
          notEmpty: {message: 'Enter here.'}
        }
      }
    });

    // Returns true if userName is valid, false if invalid.
    const isValid =await validation.validateField('userName');
    ```

## [1.0.3] - 2022/10/24
### Added
- Added Japanese phone number custom validation to form validation.  
    HTML:
    ```html
    <!--begin::Form-->
    <form data-ref="form" autocomplete="off">
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="fw-semibold fs-6 mb-2 required">Japanese phone number</label>
        <!--end::Label-->
        <!--begin::Input-->
        <input name="phoneNumberJp" class="form-control" placeholder="06-6012-3456" value="06-6012-3456">
        <!--end::Input-->
      </div>
      <!--end::Input group-->
      <!--begin::Actions-->
      <button type="submit" class="btn btn-primary">Validation Form</button>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
    ```

    JS:
    ```js
    import {Validation} from 'metronic-extension';

    const validation = new Validation(document.getElementById('myForm'), {
      phoneNumberJp: {
        validators: {
          notEmpty: {message: 'Enter here.'},
          isPhoneNumberJp: {message: 'This is not correct.'}
        }
      }
    });
    validation.onValid(() => {
      alert('Form has been successfully submitted!');
    });
    ```

## [1.0.2] - 2022/10/24
### Added
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
### Fixed
- Fix to prevent tooltip elements from being double instantiated. (src/components/initTooltip.ts)

## [1.0.1] - 2022/10/20
### Fixed
- Removed boostrap from this package which conflicts with metronic's bootstrap.

## [1.0.0] - 2022/10/17
### Added
- Released.

[1.0.1]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.3...v1.0.4
[1.0.5]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.4...v1.0.5
[1.0.6]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.5...v1.0.6
[1.0.7]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.6...v1.0.7
[1.0.8]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.7...v1.0.8
[1.0.9]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.8...v1.0.9
[1.0.10]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.9...v1.0.10
[1.0.11]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.10...v1.0.11
[1.0.12]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.11...v1.0.12
[1.0.13]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.12...v1.0.13
[1.0.14]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.13...v1.0.14
[1.0.15]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.14...v1.0.15
[1.0.16]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.15...v1.0.16
[1.0.17]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.16...v1.0.17
[1.0.18]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.17...v1.0.18
[1.0.19]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.18...v1.0.19
[1.0.20]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.19...v1.0.20
[1.0.21]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.20...v1.0.21
[1.0.22]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.21...v1.0.22
[1.0.23]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.22...v1.0.23
[2.0.0]: https://github.com/takuya-motoshima/metronic-extension/compare/v1.0.23...v2.0.0
[2.0.1]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.0...v2.0.1
[2.0.2]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.1...v2.0.2
[2.0.3]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.2...v2.0.3
[2.0.4]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.3...v2.0.4
[2.0.5]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.4...v2.0.5
[2.0.6]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.5...v2.0.6
[2.0.7]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.6...v2.0.7
[2.0.8]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.7...v2.0.8
[2.0.9]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.8...v2.0.9
[2.0.10]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.9...v2.0.10
[2.0.11]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.10...v2.0.11
[2.0.12]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.11...v2.0.12
[2.0.13]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.12...v2.0.13
[2.0.14]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.13...v2.0.14
[2.0.15]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.14...v2.0.15
[2.0.16]: https://github.com/takuya-motoshima/metronic-extension/compare/v2.0.15...v2.0.16