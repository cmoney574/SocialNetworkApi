const { User } = require('../models/');

module.exports ={
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
    },
    getUsers(req, res){
        User.find()
        .then((user) => res.json(user))
    },
    getOneUser(req, res){
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .then((user) => res.json(user))
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : User.deleteMany({ _id: { $in: user.users } })
          )
          .then(() => res.json({ message: 'user deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
}