//model import
const {Thought, User} = require('../models');

const thoughtCont = {
    getThoughts(req, res) {
        Thought.find({})
        .populate ({
            path: 'reactions',
            //got help with the select
            select: "-__v"
            .sort({ _id: -1})
            .then ((data) => res.json(data))
            .catch ((err) => {
                throw err;
            })
        });
    },


    getThoughtById({ params}, res) {
        Thought.findOne({ _id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select: '-__v'
        .then((data) => res.json (data))
        .catch ((err) => {
            throw err;
        });
    },
    //got help with this, passing in the body so we can add to it
    addThought({ params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then ((data) => res.json(data))
        .catch ((err) => {
            throw err;
        });
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then (() => {
            return User.findOneAndUpdate(
                {thoughts: params.id},
                {$pull: {thoughts: params.id}},
                {new: true}
            );
        })
        .then((data) => res.json(data))
        .catch((err) => { throw err});
    
    },

    
}