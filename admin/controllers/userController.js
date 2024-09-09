const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).render(path.join(res.locals.viewPath, 'user'), { users });
    } catch (err) {
        console.error(err);
        res.status(500).render('500', { msg: 'Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).render('404', { msg: 'User not found' });
        }
        res.status(200).render(path.join(res.locals.viewPath, 'editUser'), { user });
    } catch (err) {
        console.error(err);
        res.status(500).render('500', { msg: 'Server Error' });
    }
};

exports.getCreateUserPage = (req, res) => {
    res.status(200).render(path.join(res.locals.viewPath, 'addUser'));
};

exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).render(path.join(res.locals.viewPath, 'addUser'), { msg: 'User already exists', email, role });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            email,
            password: hashedPassword,
            role: role || 'user'
        });
        await user.save();
        res.redirect('/admin/users');
    } catch (err) {
        console.error(err);
        res.status(500).render('500', { msg: 'Server Error' });
    }
};

exports.getEditUserPage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).render('404', { msg: 'User not found' });
        }
        res.status(200).render(path.join(res.locals.viewPath, 'editUser'), { user });
    } catch (err) {
        console.error(err);
        res.status(500).render('500', { msg: 'Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).render('404', { msg: 'User not found' });
        }
        user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        user.role = role || user.role;
        await user.save();
        res.redirect('/admin/users');
    } catch (err) {
        console.error(err);
        res.status(500).render('500', { msg: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).redirect('/admin/users');
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
