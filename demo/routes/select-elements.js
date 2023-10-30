const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('select-elements');
});
module.exports = router;