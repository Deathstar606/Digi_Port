const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
    name: { type: String, default: '' },
    designation: { type: String, required: true },  
    description: { type: String, required: true },
    image: { type: String, default: '' },
})

const People = mongoose.model('People', PeopleSchema);
module.exports = People;