const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const methodOverride = require('method-override');

// Sử dụng method-override để xử lý các phương thức PUT và DELETE trong form
router.use(methodOverride('_method'));

// Lấy danh sách tất cả người dùng
router.get('/users', userController.getUsers);

// Hiển thị form để thêm người dùng mới
router.get('/new', userController.getAddUserForm);

// Tạo người dùng mới
router.post('/', userController.createUser);

// Hiển thị form để chỉnh sửa thông tin người dùng theo id
router.get('/:id/edit', userController.getEditUserForm);

// Cập nhật thông tin người dùng theo id
router.put('/:id', userController.updateUser);

// Xóa người dùng theo id
router.delete('/:id', userController.deleteUser);

module.exports = router;
