const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('popovers');
});
module.exports = router;