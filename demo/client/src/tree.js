import {selectRef, Tree} from 'metronic-extension';

const ref = selectRef();
const tree = new Tree(ref.tree, {
  // cacheLoadedChildren: false,
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
    console.log('Selected node:', node);
    ref.node.id.text(node.id);
    ref.node.path.text(tree.getPath(node, '/'));
    ref.node.text.text(node.text);
    ref.node.type.text(node.type);
  })
  .onError(err => {
    alert(err.message);
  });