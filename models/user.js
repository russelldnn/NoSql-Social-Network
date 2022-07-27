const {Schema, model, Types} = require('mongoose');
const {Thought} = require('./thought');



const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'a username is required',
            trim: true,
        },

        email: {
            type: String,
            required: 'an email is required',
            unique: true,
            //borrowed regex for validation
            match: [/.+@.+\..+/],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);


module.exports = User;