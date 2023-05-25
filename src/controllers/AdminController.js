const { successResponse, errorResponse } = require('../config/responceHandler')

const AdminRepo = require('../repo/AdminRepo')

const getAllData = async (req, res, next) => {
    try{
        const AllData = await AdminRepo.getAllData()
        if(!AllData){
            console.log("[AdminController:getAllData] Error Occured!")
            return errorResponse(res, 'Fetching Data Error!', [] , 400)
        }
        return successResponse(res, 'Getting All DAta', AllData)

    }catch(err){
        next(err)
    }
}

const removeAllData = async (req, res, next) => {
    try{
        const AllData = await AdminRepo.deleteAllData()
        if(!AllData){
            console.log("[AdminController:removeAllData] Error Occured!")
            return errorResponse(res, 'Fetching Data Error!', [] , 400)
        }
        return successResponse(res, 'All Data is Cleared.', AllData)

    }catch(err){
        next(err)
    }
}

const saveRecord = async (req, res, next) => {
    try{
        const {dept, program, session, batch, semester, instructor, courseCode, courseTitle} = req.body
        // console.log('Body', {...req.body});
        const isAlreadyExists = await AdminRepo.findRecord({dept, program, session, batch, semester, instructor, courseCode})
        if(isAlreadyExists){
            const updatedRecord = await AdminRepo.updateRecordByID(isAlreadyExists._id, {...req.body})
            if(!updatedRecord){
                return errorResponse(res, 'Unexpected Error Occured in Updating Record! Please Try Again.', [])
            }
            return successResponse(res, 'Data is Successfully Updated', updatedRecord)
        }

        const createdRecord = await AdminRepo.createRecord({...req.body})
        if(!createdRecord){
            return errorResponse(res, 'Unexpected Error Occured in Creating Record! Please Try Again.', [])
        }
        successResponse(res, 'Record is Saved Successfully', createdRecord)
    }catch(err){
        next(err)
    }
}

const getAllRecord = async (req, res, next) => {
    try{
        const AllRecords = await AdminRepo.getAllRecords()
        successResponse(res, 'Getting All Unsaved Records', AllRecords)

    }catch(err){
        next(err)
    }
}


const getCompletedRecord = async (req, res, next) => {
    try{
        const AllRecords = await AdminRepo.getCompletedRecord()
        successResponse(res, 'Getting All Saved Records', AllRecords)

    }catch(err){
        next(err)
    }
}


module.exports = {
    getAllData,
    removeAllData,
    saveRecord,
    getAllRecord,
    getCompletedRecord,


}