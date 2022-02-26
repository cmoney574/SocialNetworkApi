const { Reaction, Thought } = require('../models/');

module.exports ={
    createThought(req, res){
        Thought.create(req.body)
        .then((thought) => res.json(thought))
    },
    getThoughts(req, res){
        Thought.find()
        .then((thought) => res.json(thought))
    },
    getOneThought(req, res){
        Thought.findOne({ _id: req.params.thoughtID })
        .select('-__v')
        .then((thought) => res.json(thought))
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtID },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.courseId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : Reaction.deleteMany({ _id: { $in: thought.reactions } })
          )
          .then(() => res.json({ message: 'thought and  deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
}