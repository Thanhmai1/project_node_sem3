const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', dishController.getAllDishes);
router.get('/create', dishController.renderCreateForm);
router.post('/create', upload.single('image'), dishController.createDish);
router.get('/edit/:id', dishController.renderEditForm);
router.put('/edit/:id', upload.single('image'), dishController.updateDish);
router.delete('/delete/:id', dishController.deleteDish);

module.exports = router;
