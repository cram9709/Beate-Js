const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userName: {
        type: Schema.ObjectId,
        ref: 'User',
        required:true
    },
    body: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date
    }
});

const postSchema = new Schema({
    userName: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
    },
    comments:{
        type: [commentSchema]
    },
    picture: {
        type: String
    }
});

module.exports = model('Post', postSchema);