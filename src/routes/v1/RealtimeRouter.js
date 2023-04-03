const express = require('express');
const router = express.Router();
const RealtimeController = require('../../controllers/RealtimeController');
const checkAuth = require('../../middlewares/checkAuth');
const isPending = require('../../middlewares/isPending');
const userAs = require('../../middlewares/userAs');
const { UserRoleObject } = require('../../repo/UserRepo');

// Nurse Routes
router.post('/nurse', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.createNurse)
router.patch('/nurse', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.updateNurse)
router.delete('/nurse', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.deleteNurse)
router.post('/nurse/leave', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.addLeave)
router.patch('/nurse/leave', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.editLeave)
router.delete('/nurse/leave', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.removeLeave)
router.post('/nurse/rota', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.assignRota)

// Patient Routes
router.post('/patient', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.createPatient)
router.patch('/patient', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.updatePatient)
router.delete('/patient', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.deletePatient)
// Holiday Routes
router.post('/holiday', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.createHoliday)
router.delete('/holiday', checkAuth , userAs([UserRoleObject.approver]), isPending , RealtimeController.deleteHoliday)

// Core Operations
router.delete('/:id', checkAuth , userAs([UserRoleObject.approver]) , RealtimeController.deleteRequest)
router.patch('/reject', checkAuth , userAs([UserRoleObject.approver]), RealtimeController.rejectRequest)





module.exports = router