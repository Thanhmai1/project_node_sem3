const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/new', userController.getCreateUserPage);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/:id/edit', userController.getEditUserPage);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;