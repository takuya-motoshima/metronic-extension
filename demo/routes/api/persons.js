const router = require('express').Router();
const {query, body, validationResult} = require('express-validator');
const PersonModel = require('../../models/PersonModel');

// Get person page data.
router.get('/pages', [
  // Validate parameters.
  query('start').not().isEmpty().isInt({min: 0}),
  query('length').not().isEmpty().isInt({min: 1}),
  query('order').not().isEmpty().isIn(['name', 'position', 'office', 'age', 'startDate', 'salary']),
  query('dir').not().isEmpty().isIn(['asc', 'desc']),
  query('search.keyword').trim().optional({nullable: true, checkFalsy: true}).isLength({max: 70}),
  query('draw').not().isEmpty().isInt({min: 1}),
], async (req, res) => {
  // Check validation results.
  const result = validationResult(req);
  if (!result.isEmpty())
    // If the parameter is invalid, a 400 error is returned.
    return void res.status(400).end();

  // Get page data.
  const data = await PersonModel.paginate(req.query);

  // Set the received drawing count as-is in the response.
  data.draw = req.query.draw;
  res.json(data);
});

module.exports = router;