const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

router.get('/', dishController.getAllDishes);
router.get('/create', dishController.renderCreateForm);
router.post('/create', dishController.createDish);
router.get('/edit/:id', dishController.renderEditForm);
router.put('/edit/:id', dishController.updateDish);
router.delete('/delete/:id', dishController.deleteDish);

module.exports = router;