const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/AdminController');
const checkAuth = require('../../middlewares/checkAuth');

router.get('/allData', checkAuth , AdminController.getAllData)
router.delete('/allData', checkAuth , AdminController.removeAllData)

router.post('/saveRecord', checkAuth, AdminController.saveRecord)
router.get('/records', checkAuth, AdminController.getAllRecord)




module.exports = router