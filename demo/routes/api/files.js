const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const FileModel = require('../../models/FileModel');
const FileNotFound = require('../../exceptions/FileNotFound');

const FILE_NAME_MAXLENGTH = 20;

router.put('/:fileId(\\d+)', [
  body('text').trim().not().isEmpty().isLength({max: FILE_NAME_MAXLENGTH})
], async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty())
      return void res.status(400).send();
    await FileModel.renameFile(req.params.fileId, req.body.text);
    res.json(true);
  } catch (err) {
    if (err instanceof FileNotFound)
      res.status(404).send();
    else
      throw err;
  }
});
module.exports = router;