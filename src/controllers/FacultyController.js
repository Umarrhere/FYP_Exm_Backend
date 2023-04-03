const { successResponse, badRequest, errorResponse } = require('../config/responceHandler')

const RealtimeRepo = require('../repo/RealtimeRepo')
const FacultyRepo = require('../repo/FacultyRepo')
const PatientRepo = require('../repo/StudentsRepo')
const { UserRoleObject } = require('../repo/UserRepo')
const NurseModel = require('../models/FacultyModel')
const ApiError = require('../utils/ApiError')


// Get All Nurse For User, Approver & Admin
const getAllFaculty = async (req, res, next) => {
    try{
        const Faculty = await FacultyRepo.getAllFaculty()
        if(!Faculty){
            console.log("[FacultyController:getAllFaculty] Error Occur!")
            return errorResponse(res, 'Something went wrong in Fetching Faculty!', [])
        }
        successResponse(res, 'Getting All Faculty', Faculty)
    }catch(err){
        next(err)
    }
}

const importFaculty = async (req, res, next) => {
    try{
        const {importData} = req.body;
        
        if(!importData){
            return badRequest(res, `'importData' Array is not found with Request!`, [])
        }
        let alreadyExists = [];

        for(var data of importData){
            let regNo = data.regno;
            if(!regNo){
                continue;
            }
            const Faculty = await FacultyRepo.findOneByObject({regno: regNo})
            if(Faculty){
                alreadyExists.push(Faculty)
            }else{
               const newFaculty = await FacultyRepo.createByObject({...data})
               console.log(newFaculty);
               if(newFaculty){
                console.log(`Faculty Added: ${newFaculty.name}`);
               }else{
                console.log('Faculty Not Created: '+ data.name);
               }
            }
        }
        const AllFaculty = await FacultyRepo.getAllFaculty()
        if(!AllFaculty){
            console.log("Error", AllFaculty)
        }
    
        return successResponse(res, 'Data Imported successfully.', {alreadyExists , faculty: AllFaculty}, 201)        
    }catch(err){
        next(err)
    }
}




// // Get One Nurse by ID For User, Approver & Admin
// const getNurseByID = async (req, res, next) => {
//     try{
//         const {nurseId} = req.params
//         const Nurse = await NursesRepo.findById(nurseId)
//         if(!Nurse){
//             console.log("[NursesController:getNurseByID] Cannot Find Nurse!")
//             return errorResponse(res, 'Cannot Find Nurse By Given ID!', [])
//         }
//         successResponse(res, 'Getting Nurse', Nurse)

//     }catch(err){
//         next(err)
//     }
// }

// // Creating nurse For User and Admin
// const createNurse = async (req, res, next) => {
//     try{
//         const {userData} = req
//         console.log("[NurseController:createNurse] role", userData.role)

//         const {name, cell, code, address, joining_date, ending_date, country, experience, speciality, designation, basic_allowances, housing_allowances, other_allowances, image} = req.body
        
//         // Check Required Data is available.
//         if(!(name && cell && code && address && joining_date && country && experience && speciality && designation && basic_allowances && housing_allowances && other_allowances)){
//                 return badRequest(res, 'Please provide all the required credentials.', [])
//          }
//         // Check if Code Already Exists
//          const isAlreadyExistsByCode = await NursesRepo.findOneByObject({code})
//          if(isAlreadyExistsByCode){
//             return badRequest(res, `Nurse Already Exists with same Code '${code}'`)
//         }


//         if (userData.role === UserRoleObject.user) { //  User 
//             await createNurseByUser(req, res, next)
//         } 
//         else if (userData.role === UserRoleObject.admin){ // Admin
//             await createNurseByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])

//     }catch(err){
//         next(err)
//     }
// }

// // Updating nurse For User and Admin
// const updateNurse = async (req, res, next) => {
//     try{
//         const {userData} = req
//         const {nurseId} = req.params
//         console.log("[NurseController:updateNurse] role", userData.role)
//         console.log("[NurseController:updateNurse] body", req.body)

//         const isNurse = await NursesRepo.findById(nurseId)
//         if(!isNurse){
//             return badRequest(res, 'Nurse Id does not match to any nurse.', [])
//         }
//         req.body.nurseId = nurseId

//         if (userData.role === UserRoleObject.user) { //  User 
//             await updateNurseByUser(req, res, next)
//         } 
//         else if (userData.role === UserRoleObject.admin){ // Admin
//             await updateNurseByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])
//     }catch(err){
//         next(err)
//     }
// }

// // Deactivating nurse For User and Admin
// const removeNurse = async (req, res, next) => {
//     try{
//         const {userData} = req
//         const {nurseId} = req.params
//         const isNurse = await NursesRepo.findById(nurseId)
//         if(!isNurse){
//             return badRequest(res, 'Nurse Id does not match to any nurse.', [])
//         }

//         req.body = {nurseId} // For Adding Payload for functions
//         console.log("[NurseController:removeNurse] role", userData.role)
//         if (userData.role === UserRoleObject.user) { // User
//             await deleteNurseByUser(req, res, next)
//         } 
//         else if (userData.role === UserRoleObject.admin){ // Admin
//             await deleteNurseByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])
//     }catch(err){
//         next(err)
//     }
// }


// // Add Leaves For User and Admin
// const addLeave = async (req, res, next) => {
//     try{
//         const {userData} = req
//         console.log("[NurseController:addLeave] Role", userData.role);
//         const {nurseId, type, from, to} = req.body
//         if(!(nurseId && type && from && to)){
//             return badRequest(res, 'Please provide all the required data!', [])
//         }

//         const isNurse = await NursesRepo.findById(nurseId)
//         if(!isNurse){
//             return badRequest(res, 'NurseID Does not Match to any Nurse!', [])
//         }

//         if(userData.role === UserRoleObject.user){ // User
//            await addLeaveByUser(req, res, next)
//         }
//         else if(userData.role === UserRoleObject.admin){ // Admin
//             await addLeaveByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])
//     }catch(err){
//         next(err)
//     }

// }

// // Edit Leaves For User and Admin
// const editLeave = async (req, res, next) => {
//     try{
//         const {userData} = req
//         console.log("[NurseController:editLeave] Role", userData.role);
//         const {nurseId, leaveId, from, to} = req.body
//         if(!(nurseId && leaveId && from && to)){
//             return badRequest(res, 'Please provide all the required data!', [])
//         }

//         const isNurse = await NursesRepo.findById(nurseId)
//         if(!isNurse){
//             return badRequest(res, 'NurseID Does not Match to any Nurse!', [])
//         }

//         if(userData.role === UserRoleObject.user){ // User
//            await editLeaveByUser(req, res, next)
//         }
//         else if(userData.role === UserRoleObject.admin){ // Admin
//             await editLeaveByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])
//     }catch(err){
//         next(err)
//     }
// }

// // Remove Leave For User and Admin
// const removeLeave = async (req, res, next) => {
//     try{
//         const {userData} = req
//         const {nurseId, leaveId} = req.body

//         if(!(nurseId && leaveId)){
//             return badRequest(res, "Please Provide All The Required Credentials for the Request!", [])
//         }

//         console.log("[NurseController:removeLeave] Role", userData.role);
//         const isNurse = await NursesRepo.findById(nurseId)
//         if(!isNurse){
//             return badRequest(res, 'NurseID Does not Match to any Nurse!', [])
//         }

//         if(userData.role === UserRoleObject.user){ // User
//            await removeLeaveByUser(req, res, next)            
//         }
//         else if(userData.role === UserRoleObject.admin){ // Admin
//            await removeLeaveByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])

//     }catch(err){
//         next(err)
//     }
// }

// // Save Payroll for Admin
// const savePayroll = async (req, res, next) => {
//     try{
//         const {data, month, year} = req.body

//         if (!(data && data.length && month && year)){
//             return badRequest(res, 'Request data is not valid!', [])
//         } 
        
//         for (let record of data) {
//             if (record.code === 'Total') {
//                 console.log("[NurseController:savePayroll] record.code === Total, so Continue");
//                 continue;
//             }

//             const nurseData = await NursesRepo.findOneByObject({code: record.code})
//             if (!nurseData) {
//                 console.log("[NurseController:savePayroll] Nurse Not Found");
//                 return errorResponse(res, 'Nurse Not Found!', [], 404)
//             }

//             if (nurseData.payroll && nurseData.payroll[year] && nurseData.payroll[year][month]) {
//                 //record already exist
//                 console.log("[NurseController:savePayroll] record already exists:", nurseData);
//                 continue;
//             }
//             else {
//                     let payroll = nurseData.payroll ?? {};
//                     payroll[year] = payroll[year] ?? {};
//                     payroll[year][month] = record.total;

//                     let _payrollraw = nurseData.payrollraw ?? {};
//                     _payrollraw[year] = _payrollraw[year] ?? {};
//                     _payrollraw[year][month] = record;
//                     _payrollraw[year][month].basic_allowances = nurseData.basic_allowances;
//                     _payrollraw[year][month].housing_allowances = nurseData.housing_allowances;
//                     _payrollraw[year][month].other_allowances = nurseData.other_allowances;

//                     const updatedNurse = await NursesRepo.updateById(nurseData._id, { payroll: payroll, payrollraw: _payrollraw })
//                     if(!updatedNurse){
//                         return errorResponse(res, 'Nurse Cannot be updated.', [], 500)
//                     }
//             }
//         }
//         return successResponse(res, 'Payroll is Saved Successfully.', [], 202)
//     }catch(err){
//         next(err)
//     }
// }

// // Assigning Rota for User and Admin
// const assignRota = async (req, res, next) => {
//     try{
//         const {userData} = req
//         console.log("[NursesController:assignRota] Role", userData.role);
//         const {patientId, year, month, assignData} = req.body
//         if(!(patientId && year && month && assignData)){
//             return badRequest(res, "Please Provide All the Request Data!", [])
//         }
        
//         if(!(year.length === 4 && month.length === 2)){ // year: '2023' , month: '02'
//             return badRequest(res, 'Year or Month is not in the correct format!', [])
//         }

//         const isPatient = await PatientRepo.getOneById(patientId)
//         if(!isPatient){
//            return badRequest(res, 'Patient ID Does Not Match to Any Patient!', [])
//         }


//         if(userData.role === UserRoleObject.user){ // User
//             await assignRotaByUser(req, res, next) 
//          }
//          else if(userData.role === UserRoleObject.admin){ // Admin
//             await assignRotaByAdmin(req, res, next)
//          }
//          else return badRequest(res, 'User is not Authenticated!', [])


//     }catch(err){
//         next(err)
//     }
// }

// const checkAlreadyAssign = async (req, res, next) => {
//     try{
//         const {nurseId, patientId, date, dutyStart, dutyEnd} = req.body
//         if(!(nurseId, patientId, date, dutyStart, dutyEnd)){
//             return badRequest(res, 'Incomplete Request Data!', [])
//         }

//         const isNurse = await NursesRepo.findById(nurseId)
//         if(!isNurse){
//             return badRequest(res, 'NurseID does not match to any Nurse!', [])
//         }
//         const isPatient = await PatientRepo.getOneById(patientId)
//         if(!isPatient){
//             return badRequest(res, 'PatientID does not match to any Patient!', [])
//         }

//         const isAlreadyAssigned = await NursesRepo.findOneByObject(
//             {
//                 _id: nurseId,
//                 rota: {
//                     $elemMatch : {
//                         date: date,
//                         patientId: {$ne: patientId},
//                         $or: [
//                             { dutyStart: {$lt: dutyStart}, dutyEnd: {$gt: dutyStart}}, // Lower than time
//                             { dutyStart: {$lt: dutyEnd}, dutyEnd: {$gt: dutyEnd}}, // Greater than time
//                             { dutyStart: {$gt: dutyStart}, dutyEnd: {$lt: dutyEnd}}, // through the time
//                         ]
//                     }
//                 } 
//             }
//         )

//         if(!isAlreadyAssigned){
//             return successResponse(res, 'Allowed', {isAllowed: true})
//         }

//         const assignedRota = isAlreadyAssigned.rota.filter(val => val.date === date)
//         let Info = ''
//         for(let index in assignedRota){
//             const Patient = await PatientRepo.getOneById(assignedRota[index].patientId)
//             Info += `From: ${assignedRota[index].dutyStart} , To: ${assignedRota[index].dutyEnd} , Patient: ${Patient.name}\n`
//         }

//         const comment = `'${isNurse.name}' is already assigned to Patient${assignRota.length && 's'}.
//         Date: ${date}
//         ${Info}`

//         return successResponse(res, comment, {isAllowed: false, assigned: assignedRota})
        

//     }catch(err){
//         next(err)
//     }
// }




module.exports = {
    getAllFaculty,
    importFaculty,
    // getNurseByID,
    // createNurse,
    // updateNurse,
    // removeNurse,
    // savePayroll,
    // addLeave,
    // editLeave,
    // removeLeave,
    // assignRota,
    // checkAlreadyAssign,

}