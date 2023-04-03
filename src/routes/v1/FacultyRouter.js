const express = require('express');
// // const {upload} = require('../../config/fileHandler')
const router = express.Router();
const FacultyController = require('../../controllers/FacultyController');
// const checkAuth = require('../../middlewares/checkAuth');

// CRUD
router.get('/', FacultyController.getAllFaculty)
router.post('/import', FacultyController.importFaculty)

// router.post('/nurse', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), FacultyController.createNurse)
// router.get('/nurse/:nurseId', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]),  FacultyController.getNurseByID)
// router.patch('/nurse/:nurseId', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]),  FacultyController.updateNurse)
// router.delete('/nurse/:nurseId', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), FacultyController.removeNurse)

// // Operations
// // Leave
// router.post('/leave', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), FacultyController.addLeave)
// router.patch('/leave', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), FacultyController.editLeave)
// router.delete('/leave', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), FacultyController.removeLeave)
// // Payroll
// router.post('/payroll/save', checkAuth, userAs([UserRoleObject.admin]), FacultyController.savePayroll)
// // Rota
// router.post('/rota/assign', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), FacultyController.assignRota)
// router.post('/rota/check', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), FacultyController.checkAlreadyAssign)




module.exports = router