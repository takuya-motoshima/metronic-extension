const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('font-awesome');
});
module.exports = router;