const express = require('express');
const router = express.Router();
const HolidayController = require('../../controllers/HolidayController');
const checkAuth = require('../../middlewares/checkAuth');
const userAs = require('../../middlewares/userAs');
const { UserRoleObject } = require('../../repo/UserRepo');

router.get('/', checkAuth, HolidayController.getAllHolidays)
router.get('/:year', checkAuth, HolidayController.getHolidaysByYear)
router.post('/holiday', checkAuth, userAs([UserRoleObject.user, UserRoleObject.admin]), HolidayController.createHoliday)
router.delete('/:id', checkAuth, userAs([UserRoleObject.user, UserRoleObject.admin]), HolidayController.deleteHoliday)





module.exports = router