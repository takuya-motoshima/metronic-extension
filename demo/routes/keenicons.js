const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('keenicons');
});
module.exports = router;