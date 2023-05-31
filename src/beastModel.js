'use strict';

const mongoose = require('mongoose');

const beastSchema = new mongoose.Schema ({
    originalId: Number,
    image_url: String,
    title: {type: String, required: true},
    description: String,
    keyword: String,
    horns: Number
});

module.exports = mongoose.model('Beasts', beastSchema);
