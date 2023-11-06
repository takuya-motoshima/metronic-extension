const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('inputmask');
});
module.exports = router;