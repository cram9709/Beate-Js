const { Schema, model } = require('mongoose');

const albumSchema = new Schema({
    artistName: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    coverUrl: {
        type: [Schema.ObjectId],
        ref: 'Track'
    },
    releaseDate: {
        type: Date
    },
    createdDate: {
        type: Date
    }
});

module.exports = model('Album', albumSchema);
