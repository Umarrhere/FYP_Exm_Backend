
const RealtimeRepo = require('../repo/RealtimeRepo')
const HolidayRepo = require('../repo/HolidayRepo');
const { errorResponse, successResponse, badRequest } = require('../config/responceHandler');
const { UserRoleObject } = require('../repo/UserRepo');


// Get All holidays for User, Approved, and Admin
const getAllHolidays = async (req, res, next) => {
    try{
        const AllHolidays = await HolidayRepo.getAllHolidays()
        if(!AllHolidays){
            return errorResponse(res, 'Error Occured in getting all holidays', [])
        }

        return successResponse(res, `Getting All Holidays.`, AllHolidays, 200)

    }catch(err){
        next(err)
    }
}

// Get holidays per year for User, Approved, and Admin
const getHolidaysByYear = async (req, res, next) => {
    try{
        const {year} = req.params
        const AllHolidays = await HolidayRepo.getHolidaysByYear(year)
        if(!AllHolidays){
            return errorResponse(res, 'Error Occured in getting holidays per year!', [])
        }

        return successResponse(res, `Getting All Holidays of '${year}'.`, AllHolidays, 200)

    }catch(err){
        next(err)
    }
}

// Create Holiday for User and Admin
const createHoliday = async (req, res, next) => {
    try{
        const {year, month, day, status} = req.body
        const {userData} = req
        console.log("[HolidayController:createHoliday] Role:", userData.role)
        if(!(year && month && day)){
            return badRequest(res, 'Please Provide Complete Request Data!', [])
        }

        if(userData.role === UserRoleObject.user) { // User
           await createHolidayByUser(req, res, next)
        }
        else if (userData.role === UserRoleObject.admin) { // Admin
            await createHolidayByAdmin(req, res, next)             
        }
        else return badRequest(res, 'User is not Authenticated!', [])
    }catch(err){
        next(err)
    }
}

// Delete Holiday for User and Admin
const deleteHoliday = async (req, res, next) => {
    try{
        const {id} = req.params
        const {userData} = req
        console.log("[HolidayController:createHoliday] Role:", userData.role)

        const isHoliday = await HolidayRepo.getOneByID(id)
        if(!isHoliday){
            return badRequest(res, 'Invalid Holiday ID!', [])
        }

        req.body = {id, year: isHoliday.year, month: isHoliday.month, day: isHoliday.day} // for Payload
        if(userData.role === UserRoleObject.user) { // User
            await deleteHoldayByUser(req, res, next)
        }
        else if (userData.role === UserRoleObject.admin) { // Admin
            await deleteHolidayByAdmin(req, res, next)
        }
        else return badRequest(res, 'User is not Authenticated!', [])
    }catch(err){
        next(err)
    }
}


///////////////////////////////////////////// Sub-Functions ////////////////////////////////////////////////////////////

// Create
const createHolidayByUser = async (req, res, next) => {
    try{
        req.responseURL = '/v1/request/holiday'
        req.title = 'Creating Holiday'
        const RealtimeRequest = await RealtimeRepo.createRequest(req)
        if(!RealtimeRequest){
            console.log("[HolidayController:createHolidayByUser] Error Occured in Repo")
            return errorResponse(res, 'Request Cannot be created. [HolidayController:createHolidayByUser].', [], 500)
        }
        return successResponse(res, 'Holiday Request is Successfully Submitted', RealtimeRequest) 

    }catch(err){
        next(err)
    }
}
const createHolidayByAdmin = async (req, res, next) => {
    try{
        const {year, month, day, status} = req.body
        const isAlreadyExists = await HolidayRepo.findByObject({year, month, day})
        if(isAlreadyExists){
            console.log("isAlreadyExists",isAlreadyExists);
            return badRequest(res, 'Holiday is already been marked!', [])
        }

        const newHolidays = await HolidayRepo.createHoliday(year, month, day, status)
        if(!newHolidays){
            return errorResponse(res, 'Error Occured in creating new Holiday', [], 500)
        }
        return successResponse(res, 'Holiday is created successfully', newHolidays, 201) 

    }catch(err){
        next(err)
    }
}

// Delete
const deleteHoldayByUser = async (req, res, next) => {
    try{
        req.responseURL = '/v1/request/holiday'
        req.title = 'Deleting Holiday'
        const RealtimeRequest = await RealtimeRepo.createRequest(req)
        if(!RealtimeRequest){
            console.log("[HolidayController:deleteHoldayByUser] Error Occured in Repo")
            return errorResponse(res, 'Request Cannot be created. [HolidayController:deleteHoldayByUser].', [], 500)
        }
        return successResponse(res, 'Deleting Holiday Request is Successfully Submitted', RealtimeRequest) 

    }catch(err){
        next(err)
    }
}
const deleteHolidayByAdmin = async (req, res, next) => {
    try{
        const {id} = req.body      

        const deletedHoliday = await HolidayRepo.removeOneByID(id)
        if(!deletedHoliday){
            return errorResponse(res, 'Error Occured in deleting Holiday', [], 500)
        }
        return successResponse(res, 'Holiday is deleted successfully', deletedHoliday, 200) 

    }catch(err){
        next(err)
    }
}


module.exports = {
    getAllHolidays,
    getHolidaysByYear,
    createHoliday,
    deleteHoliday,
    



}