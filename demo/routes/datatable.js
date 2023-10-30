const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('datatable');
});
module.exports = router;