const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    redirectURL: { type: String, required: true },
    urlCode: { type: String, required: true, unique: true },
    shortURL: { type: String, required: true, unique: true },
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;   