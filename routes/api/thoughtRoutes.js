const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getOneThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControler');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;