const express = require('express');
const router = express.Router();
const AdminRouter = require('./AdminRouter')
const FacultyRouter = require('./FacultyRouter')
const StudentsRouter = require('./StudentsRouter')
const UserRouter = require('./UserRouter')
const HolidayRouter = require('./HolidayRouter')


router.use('/admin', AdminRouter)
router.use('/students', StudentsRouter)
router.use('/faculty', FacultyRouter)
router.use('/users', UserRouter)
router.use('/holidays', HolidayRouter)


module.exports = router;
