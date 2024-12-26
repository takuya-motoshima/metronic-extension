const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const FolderModel = require('../../models/FolderModel');
const FileModel = require('../../models/FileModel');

// Check validation results.
const checkValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty())
    // If there are no errors, go to the next process.
    next();
  else
    // If there is an error, return a 400 error.
    res.status(400).send();
}

// Get node data. If the node ID of the parameter is "#", the root node's own data is acquired; otherwise, the child nodes of the node corresponding to the ID are acquired.
router.get('/:folderId(\\d+|%23)', async (req, res) => {
  const children = await FolderModel.findChildren(req.params.folderId);
  res.json(children);
});

// Create a node.
router.post('/:type(folder|file)/:folderId(\\d+)', [
  body('text').trim().not().isEmpty(),
  checkValidationResult
], async (req, res) => {
  let newNode;
  if (req.params.type === 'folder')
    newNode = await FolderModel.createNode(req.params.folderId, req.body.text);
  else
    newNode = await FileModel.createNode(req.params.folderId, req.body.text);
  res.json({id: newNode.id});
});

// Rename node.
router.put('/:type(folder|file)/:nodeId(\\d+)', [
  body('text').trim().not().isEmpty(),
  checkValidationResult
], async (req, res) => {
  if (req.params.type === 'folder')
    await FolderModel.renameNode(req.params.nodeId, req.body.text);
  else
    await FileModel.renameNode(req.params.nodeId, req.body.text);
  res.json({});
});

// Delete node.
router.delete('/:type(folder|file)/:nodeId(\\d+)', async (req, res) => {
  if (req.params.type === 'folder')
    await FolderModel.deleteNode(req.params.nodeId);
  else
    await FileModel.deleteNode(req.params.nodeId);
  res.json({});
});

module.exports = router;