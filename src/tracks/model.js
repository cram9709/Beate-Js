const { Schema, model} = require('mongoose');
const profileModel = require('../profile/profile.model');

const trackSchema = new Schema({
    artisName: {
      type: String,
      required:true,
    },
    name: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
    },
    albumName: {
        type: String,
        required: true
    }
});

module.exports = model('Track', trackSchema);
