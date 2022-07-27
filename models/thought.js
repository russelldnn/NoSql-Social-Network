const {schema, model, types} = require('mongoose');
//borrowed date formatting util
const dateFormat = require('../utils/dateFormat');



const thoughtSchema = new schema(
    {
        thoughtText: {
            type: String,
            required: 'please add a thought',
            minlength: 1,
            maxlength: 280,
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },

        username: {
            type: String,
            required: 'please add a username'
        },

        reactions: [reactionSchema],
    },
    {
        toJson: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


const reactionSchema = new schema()

