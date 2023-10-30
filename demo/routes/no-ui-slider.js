const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('no-ui-slider');
});
module.exports = router;