const Dish = require('../models/dishModel');

// Render trang danh sách món ăn
exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.render('dishes/index', { dishes: dishes });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

// Render form tạo món ăn mới
exports.renderCreateForm = (req, res) => {
    res.render('dishes/create');
};

// Tạo mới Dish
exports.createDish = async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.save();
        res.redirect('/dish'); // Chuyển hướng về trang danh sách sau khi tạo
    } catch (error) {
        res.status(400).render('error', { message: error.message });
    }
};

// Render form chỉnh sửa món ăn
exports.renderEditForm = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).render('error', { message: 'Dish not found' });
        res.render('dishes/edit', { dish: dish });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

// Cập nhật Dish theo ID
exports.updateDish = async (req, res) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDish) return res.status(404).render('error', { message: 'Dish not found' });
        res.redirect('/dish'); // Chuyển hướng về trang danh sách sau khi cập nhật
    } catch (error) {
        res.status(400).render('error', { message: error.message });
    }
};

// Xóa Dish theo ID
exports.deleteDish = async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        if (!deletedDish) return res.status(404).render('error', { message: 'Dish not found' });
        res.redirect('/dish'); // Chuyển hướng về trang danh sách sau khi xóa
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

// API endpoints (nếu cần)
exports.getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        res.json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};