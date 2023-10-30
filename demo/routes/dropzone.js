const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('dropzone');
});
module.exports = router;