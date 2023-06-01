import {selectRef, Tree} from 'metronic-extension';
import highlight from '~/shared/highlight';
import NodeCreateModal from '~/modals/NodeCreateModal';

highlight();
const ref = selectRef();
const nodeCreateModal = new NodeCreateModal();
const tree = new Tree(ref.tree, {
  folderMaxlen: 20,
  fileMaxlen: 20,
  nodeTypes: {
    // folder: {
    //   type: 'folder',
    //   icon: 'fa fa-folder text-warning',
    // },
    file: {
      // type: 'file',
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
tree
  .onCreateFileHook(async parent => {
    return nodeCreateModal.show(parent.id);
  })
  .onReady(evnt => {
    console.log('ready event fires');
  })
  .onSelected((evnt, node) => {
    console.log('selected event fires. node=', node);
    ref.node.id.text(node.id);
    ref.node.path.text(tree.getPath(node, '/'));
    ref.node.text.text(node.text);
    ref.node.type.text(node.type);
  })
  // .onFetch(nodeData => {
  //   console.log('Fetched node data:', nodeData);
  // })
  .onError(err => {
    alert(err.message);
  });

// Set a tree instance to a global variable for testing in the Developer Tools.
globalThis.tree = tree;