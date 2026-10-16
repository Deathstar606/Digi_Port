const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    name: { type: String, default: '' },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    video: { type: String, default: '' },
})

const Cases = mongoose.model('Case', CaseSchema);
module.exports = Cases;