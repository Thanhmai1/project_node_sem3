// models/dish.js
const mongoose = require('mongoose');

// Định nghĩa schema cho Dish
const dishSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Export model
module.exports = mongoose.model('Dish', dishSchema);
