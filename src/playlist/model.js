const {Schema, model} = require('mongoose');

const playListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userCreate: {
        type: String,
        required: true,
    },
    songs: {
        type: [Schema.ObjectId],
        ref: 'Track',
        required: true
    }
});

module.exports = model('PlayList', playListSchema);