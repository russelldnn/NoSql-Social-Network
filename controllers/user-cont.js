const { User, Thought } = require("../models");

const userCont = {
  
  getUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((data) => res.json(data))
      .catch((err) => { throw err });
  },

  
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((data) => { res.json(data)})
      .catch((err) => { throw err});
  },

  
  addUser({ body }, res) {
    User.create(body)
      .then((data) => res.json(data))
      .catch((err) => {throw err});
  },

  
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {res.json(data);
      })
      .catch((err) => { throw err});
  },

  
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(() => {
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
    
      .catch((err) => {throw err});
  },

  
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((data) => {res.json(data)})
      .catch((err) => {throw err});
  },

  
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((data) => {res.json(data)})
      .catch((err) => {throw err});
  },
};
module.exports = userCont;