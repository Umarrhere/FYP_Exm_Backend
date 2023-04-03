const { successResponse, badRequest, errorResponse } = require('../config/responceHandler');
const RealtimeRepo = require('../repo/RealtimeRepo')
const NursesRepo = require('../repo/NursesRepo')
const PatientRepo = require('../repo/PatientRepo')
const HolidayRepo = require('../repo/HolidayRepo');
const { AssigningNurseRota } = require('./NursesController');




// Core Operations about Request
const deleteRequest = async (req, res, next) => {
    try{
        const {id} = req.params
       
        console.log("[RealtimeController:deleteRequest] removing by id", id);
        const isDeleted =  await RealtimeRepo.removeOneById(id)
        if(!isDeleted){
            return badRequest(res, 'Request ID Does Not Match!', [])
        }
        return successResponse(res, 'Request is Successfully Closed.', [], 202)

    }catch(err){
        next(err)
    }
}
const rejectRequest = async (req, res, next) => {
    try{
        const {_id} = req.body
        
        if(req.body.status === RealtimeRepo.RequestStatus.rejected){
            console.log("[RealtimeController: rejectRequest] Rejecting Request")
            const data =  await RealtimeRepo.updateOneById(_id, { status: RealtimeRepo.RequestStatus.rejected})
            if(!data){
                return errorResponse(res, '[RealtimeController: rejectRequest] Request Cannot be Rejected!', [])
            }
            return successResponse(res, 'Request is Rejected Successfully', data)
        }
        else return badRequest(res, 'Unknown Request Status.', [])
    }catch(err){
        next(err)
    }
}

// Nurses
const createNurse = async (req, res, next) => {
    try{
        const requestId = req.body._id
        
        if (req.body.status === RealtimeRepo.RequestStatus.approved) { // Approved
            console.log("[RealtimeController: createNurse] Approving Request")
            const data =  await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return badRequest(res, 'Issue Occured in [RealtimeController: createNurse]', [])
            }
                
            const nurseCreated = await NursesRepo.createByObject({...req.body.data})
            if(!nurseCreated){
                return errorResponse(res, 'RealtimeController: createNurse] Nurse is not been created!', [])
            }
            return successResponse(res, 'Nurse is Created Successfully.', nurseCreated, 201)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}
const updateNurse = async (req, res, next) => {
    try{
        const requestId = req.body._id
       
        const {nurseId} = req.body.data
        if (req.body.status === RealtimeRepo.RequestStatus.approved) { // Approved
            console.log("[RealtimeController: updateNurse] Approving Request")
            const data =  await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return badRequest(res, 'Issue Occured in [RealtimeController: updateNurse]', [])
            }

            const nurseUpdated = await NursesRepo.updateById(nurseId, {...req.body.data})
            if(!nurseUpdated){
                return badRequest(res, 'Issue Occured in [RealtimeController: updateNurse] nurse Updated!', [])
            }
            return successResponse(res, 'Nurse is Updated Successfully.', nurseUpdated, 202)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}
const deleteNurse = async (req, res, next) => {
    try{
        const requestId = req.body._id
    
        const {nurseId} = req.body.data
        console.log('NurseID', nurseId);
        if (req.body.status === RealtimeRepo.RequestStatus.approved) {
            // Approved
            console.log("[RealtieController:deleteNurse] Approving Request")
            const data = await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                errorResponse(res, "Error Occured [RealtieController:deleteNurse] Approving Request")
            }

            const inactiveNurese = await NursesRepo.updateById(nurseId, {active: false})
            if(!inactiveNurese){
                return errorResponse(res, 'Nurse cannot be created.')
            }
            return successResponse(res, 'Nurse is set to InActive', {nurse: inactiveNurese, request: data}, 202)
        }
        else return badRequest(res, 'Unknown Request Status.', [])
    }catch(err){
        next(err)
    }
}
// Leave
const addLeave = async (req, res, next) => {
    try{
        const requestId = req.body._id
    
        if(req.body.status === RealtimeRepo.RequestStatus.approved){ // Approved
            console.log("[RealtimeController:addLeave] Approving Request")
            const data = await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return errorResponse(res, '[RealtimeController:addLeave] Error Occured in updating request status', data)
            }

            let today = new Date();
            let leave_id = today.getFullYear().toString() + today.getMonth().toString() + today.getDate().toString() + today.getDay().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString() + today.getMilliseconds().toString();
            const payload = { leaveId: leave_id, from: req.body.data.from, to: req.body.data.to, type: req.body.data.type}

            const updatedNurse = await NursesRepo.pushById(req.body.data.nurseId, {"leave" : payload})
            if(!updatedNurse){
                return errorResponse(res, '[RealtimeController:addLeave] Error Occured in add Nurse Leave.', updatedNurse)
            }

            const AllNurses = await NursesRepo.getAllNurses()
            return successResponse(res, 'Adding Nurse Leave is Successfully Approved.', AllNurses, 202)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}
const editLeave = async (req, res, next) => {
    try{
        const requestId = req.body._id
        const {nurseId, leaveId, from, to} = req.body.data
        if(req.body.status === RealtimeRepo.RequestStatus.approved){ // Approved
            console.log("[RealtimeController:editLeave] Approving Request")
            const data = await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return errorResponse(res, '[RealtimeController:editLeave] Error Occured in updating request status', data)
            }

            const updatedNurse = await NursesRepo.updateByObj(
                {_id: nurseId},
                { $set : {"leave.$[el].from": from,"leave.$[el].to": to }},
                {
                    arrayFilters: [{ "el.leaveId": parseInt(leaveId) }],
                    new: true,
                }
            )
            if(!updatedNurse){
                    return errorResponse(res,'[RealtimeController:editLeave] Error Occured in updating nurse', updatedNurse)
            }

            const AllNurses = await NursesRepo.getAllNurses()
            return successResponse(res, 'Editing Nurse-Leave is Successfully Approved.', AllNurses, 202)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}
const removeLeave = async (req, res, next) => {
    try{
        const requestId = req.body._id
        const {leaveId, nurseId} = req.body.data
        if(req.body.status === RealtimeRepo.RequestStatus.approved){ // Approved
            console.log("[RealtimeController:removeLeave] Approving Request")
            const data = await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return errorResponse(res, '[RealtimeController:removeLeave] Error Occured in updating request status', data)
            }

            const payload = {leaveId: leaveId}
            const updatedNurse = await NursesRepo.pullById(nurseId, {"leave" : payload})
            if(!updatedNurse){
                    return errorResponse(res, '[RealtimeController:removeLeave] Error Occured in updating nurse', updatedNurse)
            }

            const AllNurses = await NursesRepo.getAllNurses()
            return successResponse(res, 'Removing Nurse-Leave is Successfully Approved.', AllNurses, 202)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}
// Rota
const assignRota = async (req, res, next) => {
    try{
        const requestId = req.body._id
        const {patientId, year, month, assignData} = req.body.data

        if(req.body.status === RealtimeRepo.RequestStatus.approved){  // Approved
            const data = RealtimeRepo.updateOneById(requestId, {status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return badRequest(res, 'Error Occured in updating Request Status [RealtimeController:assignRota]', [])
            }

            const AssignData = AssigningNurseRota(patientId, year, month, assignData)
            if(!AssignData){
                return errorResponse(res, 'Rota Cannot be Assigned!', [])
            }

            successResponse(res, 'Rota is Successfully Assigned.', AssignData)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}

// Patients
const createPatient = async (req, res, next) => {
    try{
        const requestId = req.body._id
       
        if(req.body.status === RealtimeRepo.RequestStatus.approved){  // Approved
            const data = RealtimeRepo.updateOneById(requestId, {status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return badRequest(res, 'Error Occured in updating Request Status [RealtimeController:createPatient]', [])
            }

            const patientCreated = await PatientRepo.createByObject({...req.body.data})
            if(!patientCreated){
                return errorResponse(res, 'Patient Cannot be created with an unexpected Error!', [], 500)
            }
            return successResponse(res, 'Patient is Created Successfully.', {patient: patientCreated}, 201)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}
const updatePatient = async (req, res, next) => {
    try{
        const requestId = req.body._id
        
        if(req.body.status === RealtimeRepo.RequestStatus.approved){  // Approved
            const data = RealtimeRepo.updateOneById(requestId, {status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                return badRequest(res, 'Error Occured in updating Request Status [RealtimeController:updatePatient]', [])
            }

            const {patientId} = req.body.data
            console.log("patientId",patientId);
            const patientUpdated = await PatientRepo.updateById(patientId, {...req.body.data})
            if(!patientUpdated){
                return errorResponse(res, 'Patient Cannot be updated with an unexpected Error! [RealtimeController:updatePatient]', [], 500)
            }
            return successResponse(res, 'Patient is Updated Successfully.', {patient: patientUpdated}, 202)
        }
        else return badRequest(res, 'Unknown Request Status.', [])
    }catch(err){
        next(err)
    }
}
const deletePatient = async (req, res, next) => {
    try{
        const requestId = req.body._id
    
        const {patientId} = req.body.data
        console.log('patientId', patientId);
        if (req.body.status === RealtimeRepo.RequestStatus.approved) {  // Approved
            console.log("[RealtieController:deletePatient] Approving Request")
            const data = await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved})
            if(!data){
                errorResponse(res, "Error Occured [RealtieController:deletePatient] Approving Request")
            }

            const deletedPatient = await PatientRepo.removeOneById(patientId)
            if(!deletedPatient){
                return badRequest(res, 'Error: Patient cannot be deleted!', [])
            }
            return successResponse(res, 'Patient Deleted Successfully.', deletedPatient, 202)
        }
        else return badRequest(res, 'Unknown Request Status.', [])
    }catch(err){
        next(err)
    }
}



// Holiday
const createHoliday = async (req, res, next) => {
    try{
        const requestId = req.body._id
        const {year, month, day, status} = req.body.data
        if(!(year && month && day)){
            return badRequest(res, 'Please provide required data with request!', [])
        }

        if (req.body.status === RealtimeRepo.RequestStatus.approved) {
            const data = await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved })
            if(!data){
                return errorResponse(res, 'Error Occured in Approving the Request!', [], 500)
            }
          
            const newHoliday = await HolidayRepo.createHoliday(year, month, day, status)
            if(!newHoliday){
              return errorResponse(res, 'Error Occured in creating Holiday', [])
            }

            return successResponse(res, 'Holiday Created Successfully.', newHoliday, 201)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}
const deleteHoliday = async (req, res, next) => {
    try{
        const requestId = req.body._id
        const {id} = req.body.data

        if (req.body.status === RealtimeRepo.RequestStatus.approved) {
            const data = await RealtimeRepo.updateOneById(requestId, { status: RealtimeRepo.RequestStatus.approved })
            if(!data){
                return errorResponse(res, 'Error Occured in Approving the Request!', [], 500)
            }
          
            const deletedHoliday = await HolidayRepo.removeOneByID(id)
            if(!deletedHoliday){
              return errorResponse(res, 'Error Occured in Deleting Holiday', [])
            }

            return successResponse(res, 'Holiday Deleted Successfully.', deletedHoliday, 200)
        }
        else return badRequest(res, 'Unknown Request Status.', [])

    }catch(err){
        next(err)
    }
}






module.exports = {
    deleteRequest,
    rejectRequest,
    createNurse,
    updateNurse,
    deleteNurse,
    addLeave,
    editLeave,
    removeLeave,
    assignRota,
    createPatient,
    updatePatient,
    deletePatient,
    createHoliday,
    deleteHoliday,

    






}