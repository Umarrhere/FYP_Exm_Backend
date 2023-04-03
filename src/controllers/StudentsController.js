const { successResponse, badRequest, errorResponse } = require('../config/responceHandler')

const RealtimeRepo = require('../repo/RealtimeRepo')
const StudentsRepo = require('../repo/StudentsRepo');
const { UserRoleObject } = require('../repo/UserRepo');


const getAllStudents = async (req, res, next) => {
    try{
        const Students = await StudentsRepo.getAllStudents()
        if(!Students){
            return errorResponse(res, '[StudentsController:getAll] Cannot Get Students')
        }
        return successResponse(res, 'Getting All Students', Students)
    }catch(err){
        next(err)
    }
}

// // Getting All Patients for User, Approver and Admin
// const getPatientById = async (req, res, next) => {
//     try{
//         const {patientId} = req.params
//         console.log("[PatientController:getPatientById] Getting Patient of ID: ", patientId);
//         const Patient = await StudentsRepo.getOneById(patientId)
//         if(!Patient){
//             return errorResponse(res, `No Patient Match this Patient ID: ${patientId}`)
//         }
//         return successResponse(res, 'Getting Patient', Patient)
//     }catch(err){
//         next(err)
//     }
// }

// // Creating New Patient for User and Admin
// const createPatient = async (req, res, next) => {
//     try{
//         const {userData} = req
//         console.log("[PatientController:createNew] Role", userData.role);
//         const {name, code, speciality, address, cell, level, image} = req.body

//         // Check Required Data is available.
//         if(!(name && code && speciality && address && cell && level)){
//             return badRequest(res, 'Please provide all the required credentials.', [])
//         }
//         // Check if Code Already Exists
//         const isAlreadyExistsByCode = await StudentsRepo.getOneByCode(code)
//         if(isAlreadyExistsByCode){
//             return badRequest(res, `Patient Already Exists with same Code '${code}'`)
//         }
        
//         if(userData.role === UserRoleObject.user){ // User
//             await createPatientByUser(req, res, next)
//         }
//         else if(userData.role === UserRoleObject.admin){ // Admin
//             await createPatientByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])
//     }catch(err){
//         next(err)
//     }
// }

// // Updating Patient for User and Admin
// const updatePatient = async (req, res, next) => {
//     try{
//         const {userData} = req
//         console.log("[PatientController:updatePatient] Role", userData.role);
//         const {patientId} = req.params

//         const isPatient = await StudentsRepo.getOneById(patientId)
//         if(!isPatient){
//             return badRequest(res, 'Patient ID does not match to any Patient!', [])
//         }
//         req.body.patientId = patientId // for Payload
        
//         if(userData.role === UserRoleObject.user){ // User
//             await updatePatientByUser(req, res, next)
//         }
//         else if(userData.role === UserRoleObject.admin){ // Admin
//             await updatePatientByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])

//     }catch(err){
//         next(err)
//     }
// }

// // Removing nurse For User and Admin
// const removePatient = async (req, res, next) => {
//     try{
//         const {userData} = req
//         const {patientId} = req.params
//         const isPatient = await StudentsRepo.getOneById(patientId)
//         if(!isPatient){
//             return badRequest(res, 'Patient ID does not match to any Patient!', [])
//         }
//         req.body = {patientId} // for Payload attachment
     
//         if (userData.role === UserRoleObject.user) { // User
//             await removePatientByUser(req, res, next)
//         } 
//         else if (userData.role === UserRoleObject.admin){ // Admin
//             await removePatientByAdmin(req, res, next)
//         }
//         else return badRequest(res, 'User is not Authenticated!', [])
//     }catch(err){
//         next(err)
//     }
// }

const importStudents = async (req, res, next) => {
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

            const Student = await StudentsRepo.getOneByRegno(regNo)
            if(Student){
                alreadyExists.push(Student)
            }else{
                console.log('Heree');
               const NewStudent = await StudentsRepo.createByObject({...data})
               console.log(NewStudent);
               if(NewStudent){
                console.log(`Student Added: ${NewStudent.name}`);
               }else{
                console.log('Student Not Created: '+ data.name);
               }
            }
        }
        const AllStudents = await StudentsRepo.getAllStudents()
        if(!AllStudents){
            console.log("Error", AllStudents)
        }
    
        return successResponse(res, 'Data Imported successfully.', {alreadyExists , students: AllStudents}, 201)        
    }catch(err){
        next(err)
    }
}













module.exports = {
    getAllStudents,
    importStudents,

}