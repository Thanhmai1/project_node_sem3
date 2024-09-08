// routes/dishRoutes.js
const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

// Tạo mới Dish
router.post('/dishes', dishController.createDish);

// Lấy tất cả các Dish
router.get('/dishes', dishController.getAllDishes);

// Lấy Dish theo ID
router.get('/dishes/:id', dishController.getDishById);

// Cập nhật Dish theo ID
router.put('/dishes/:id', dishController.updateDish);

// Xóa Dish theo ID
router.delete('/dishes/:id', dishController.deleteDish);

module.exports = router;