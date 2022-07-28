const {Schema, model, Types} = require('mongoose');
//borrowed date formatting util
const dateFormat = require('../utils/dateFormat');


//in this context reactions are comments
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id:false,
    }
);

//thought model to set what each component is looking for
const thoughtSchema = new Schema(
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




thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;

