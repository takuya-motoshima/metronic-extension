import {components} from 'metronic-extension';

// Initialize Tree.
const basicTree = new components.Tree(document.getElementById('basicTree'), {
  ajax: {
    children: node => {
      // This is an example of simply retrieving tree data in JSON without using the server side.
      if (node.id === '#')
        // If the node ID is "#", the data of the root node itself is returned.
        return 'json/tree-root-itself.json';
      else if (node.id == 1)
        // If the node ID is "1", the data of the child node associated with the root node (ID=1) is returned.
        return 'json/tree-roots-children.json';
      else if (node.id == 2)
        // If the node ID is "2", the data of the child node (ID=2) associated with the child1 node is returned.
        return 'json/tree-child1s-children.json';
    },
    // children: '/api/tree/_PARENT_NODE_ID_',
    // createFolder: '/api/tree/folder/_PARENT_NODE_ID_',
    // deleteFolder: '/api/tree/folder/_CURRENT_NODE_ID_',
    // renameFolder: '/api/tree/folder/_CURRENT_NODE_ID_',
    // createFile: '/api/tree/file/_PARENT_NODE_ID_',
    // deleteFile: '/api/tree/file/_CURRENT_NODE_ID_',
    // renameFile: '/api/tree/file/_CURRENT_NODE_ID_',
  },
  readonly: true,
  nodeTypes: {
    file: {
      icon: 'fa-solid fa-computer text-white',// Changed file node icons.
    },
  },
});

// Set tree event.
basicTree
  .onSelected((evnt, node) => {
    // Display selected node information.
    document.getElementById('nodeId').textContent = node.id;
    document.getElementById('nodePath').textContent = basicTree.getPath(node, '/');
    document.getElementById('nodeText').textContent = node.text;
    document.getElementById('nodeType').textContent = node.type;
  })
  .onError(err => {
    // Displays errors encountered in tree operations.
    alert(err);
  });

// Initialize Tree.
const serverSideProcessingTree = new components.Tree(document.getElementById('serverSideProcessingTree'), {
  ajax: {
    children: '/api/tree/_PARENT_NODE_ID_',
    createFolder: '/api/tree/folder/_PARENT_NODE_ID_',
    deleteFolder: '/api/tree/folder/_CURRENT_NODE_ID_',
    renameFolder: '/api/tree/folder/_CURRENT_NODE_ID_',
    createFile: '/api/tree/file/_PARENT_NODE_ID_',
    deleteFile: '/api/tree/file/_CURRENT_NODE_ID_',
    renameFile: '/api/tree/file/_CURRENT_NODE_ID_',
  },
  nodeTypes: {
    file: {
      icon: 'fa-solid fa-computer text-white',// Changed file node icons.
    },
  },
});