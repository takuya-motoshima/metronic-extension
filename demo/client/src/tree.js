import {selectRef} from 'metronic-extension';
import Tree from '~/shared/Tree';
import '~/tree.css';

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