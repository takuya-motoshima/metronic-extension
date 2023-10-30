const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('flex-layouts');
});
module.exports = router;