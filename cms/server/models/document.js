var mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String },
    description: { type: String },
    children: { type: [{id: String, name: String, url: String}]},
});

module.exports = mongoose.model('Document', documentSchema);
