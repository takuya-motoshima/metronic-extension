const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('form-controls');
});
module.exports = router;