import {selectRef, Tree} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
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
  .onReady(evnt => {
    // console.log('ready event fires. evnt=', evnt);
    console.log('ready event fires. evnt=', evnt, ', tree.getSelectedNode()=', tree.getSelectedNode());
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