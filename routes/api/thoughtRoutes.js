const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getOneThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtControler');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

  router.route('/:thoughtId/reactions')
  .post(addReaction);

router.route('/:thoughtId/reactions')
  .delete(deleteReaction);

module.exports = router;