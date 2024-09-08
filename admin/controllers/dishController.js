// controllers/dishController.js
const Dish = require('../models/dishModel');

// Tạo mới Dish
exports.createDish = async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.save();
        res.status(201).json(newDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả các Dish
exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.render('dishes/index', { dishes: dishes });
        // res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy Dish theo ID
exports.getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        res.json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật Dish theo ID
exports.updateDish = async (req, res) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDish) return res.status(404).json({ message: 'Dish not found' });
        res.json(updatedDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa Dish theo ID
exports.deleteDish = async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        if (!deletedDish) return res.status(404).json({ message: 'Dish not found' });
        res.json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
