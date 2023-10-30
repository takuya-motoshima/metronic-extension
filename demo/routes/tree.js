const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('tree');
});
module.exports = router;