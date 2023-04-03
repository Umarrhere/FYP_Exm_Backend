const express = require('express');
const router = express.Router();
const StudentsController = require('../../controllers/StudentsController');
const checkAuth = require('../../middlewares/checkAuth');


// CRUD
router.get('/', StudentsController.getAllStudents)
// router.get('/patient/:patientId', checkAuth, PatientController.getPatientById)
// router.post('/patient', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), PatientController.createPatient)
// router.patch('/patient/:patientId', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), PatientController.updatePatient)
// router.delete('/patient/:patientId', checkAuth, userAs([UserRoleObject.admin, UserRoleObject.user]), PatientController.removePatient)

// Operations
router.post('/import', StudentsController.importStudents)




module.exports = router