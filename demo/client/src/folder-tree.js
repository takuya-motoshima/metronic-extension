import {selectRef} from 'metronic-extension';
import FolderTree from '~/shared/FolderTree';
import '~/folder-tree.css';

const ref = selectRef();
const tree = new FolderTree(ref.tree, {
  folderNameMaxlength: 20,
  fileNameMaxlength: 20,
  api: {
    getChildren: '/api/folders/_PARENT_/children',
    createFolder: '/api/folders/_PARENT_',
    deleteFolder: '/api/folders/_CURRENT_',
  },
});
window.tree = tree;