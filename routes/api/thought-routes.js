//requiring router to use it to do rotes
const router = require('express').Router();
//controller functions to fit into the router
const {
    getThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-cont');


//post route
router.route('/').get(getThoughts).post(addThought);

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);


router.route('/:thoughtId/reactions')
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);



module.exports = router;