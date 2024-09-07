const User = require('../models/userModel');
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('user', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddUserForm = (req, res) => {
    res.render('addUser');
};

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error creating user');
    }
};
exports.getEditUserForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('editUser', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
exports.updateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { email, password },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error updating user');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
