const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    time
}, {timestamps: true});

const Item = mongoose.model('item', itemSchema);

module.export = Item; 