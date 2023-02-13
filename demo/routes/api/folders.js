const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const FolderModel = require('../../models/FolderModel');
const FolderNotFound = require('../../exceptions/FolderNotFound');

const FOLDER_NAME_MAXLENGTH = 20;
  
// For the root folder, specify "#" for the folder ID in the path parameter.
router.get('/:parent(\\d+|%23)/children', async (req, res) => {
  const children = await FolderModel.getChildren(req.params.parent);
  res.json(children);
});

router.post('/:parent(\\d+)', [
  body('text').trim().not().isEmpty().isLength({max: FOLDER_NAME_MAXLENGTH})
], async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty())
    return void res.status(400).send();
  const newFolder = await FolderModel.createFolder(req.params.parent, req.body.text);
  res.json(newFolder.toJSON());
});

router.delete('/:folderId(\\d+)', async (req, res) => {
  try {
    await FolderModel.deleteFolder(req.params.folderId);
    res.json(true);
  } catch (err) {
    if (err instanceof FolderNotFound)
      res.status(404).send();
    else
      throw err;
  }
});

router.put('/:folderId(\\d+)', [
  body('text').trim().not().isEmpty().isLength({max: FOLDER_NAME_MAXLENGTH})
], async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty())
      return void res.status(400).send();
    await FolderModel.renameFolder(req.params.folderId, req.body.text);
    res.json(true);
  } catch (err) {
    if (err instanceof FolderNotFound)
      res.status(404).send();
    else
      throw err;
  }
});
module.exports = router;