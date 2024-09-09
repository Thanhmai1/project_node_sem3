const Dish = require('../models/dishModel');

exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.render('dishes/index', { dishes });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

exports.renderCreateForm = (req, res) => {
    res.render('dishes/create');
};

exports.createDish = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : '';
        const newDish = new Dish({ title, description, image });
        await newDish.save();
        res.redirect('/admin/dish');
    } catch (error) {
        res.status(400).render('error', { message: error.message });
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).render('error', { message: 'Dish not found' });
        res.render('dishes/edit', { dish });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

exports.updateDish = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const updatedDish = await Dish.findByIdAndUpdate(
            req.params.id,
            { title, description, image: image || undefined },
            { new: true }
        );
        if (!updatedDish) return res.status(404).render('error', { message: 'Dish not found' });
        res.redirect('/admin/dish');
    } catch (error) {
        res.status(400).render('error', { message: error.message });
    }
};

exports.deleteDish = async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        if (!deletedDish) return res.status(404).render('error', { message: 'Dish not found' });
        res.redirect('/admin/dish');
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};
