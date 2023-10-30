const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('opacity');
});
module.exports = router;