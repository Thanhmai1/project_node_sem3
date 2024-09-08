const Dish = require('../models/dishModel');

const index = async (req, res) => {
    const dishes = await Dish.getAllDishes();
    res.render('dishes/index', { dishes });
};

const create = (req, res) => {
    res.render('dishes/create');
};

const store = async (req, res) => {
    const { thumbnail, title, description } = req.body;
    await Dish.addDish({ thumbnail, title, description });
    res.redirect('/dishes');
};

const edit = async (req, res) => {
    const dish = await Dish.getDishById(req.params.id);
    res.render('dishes/edit', { dish });
};

const update = async (req, res) => {
    const { thumbnail, title, description } = req.body;
    await Dish.updateDish(req.params.id, { thumbnail, title, description });
    res.redirect('/dishes');
};

const remove = async (req, res) => {
    await Dish.deleteDish(req.params.id);
    res.redirect('/dishes');
};

module.exports = { index, create, store, edit, update, remove };
