const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin } = require('../middleware/auth');  // Đảm bảo đường dẫn chính xác

// Đường dẫn để hiển thị trang chỉnh sửa người dùng, yêu cầu quyền admin
router.get('/users/:id/edit', isAdmin, userController.getEditUserPage);

// Đường dẫn để cập nhật thông tin người dùng, yêu cầu quyền admin
router.put('/users/:id', isAdmin, userController.updateUser);

module.exports = router;
