const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('block-ui');
});
module.exports = router;