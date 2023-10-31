const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('breadcrumb');
});
module.exports = router;