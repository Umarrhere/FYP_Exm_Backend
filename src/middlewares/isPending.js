const { badRequest } = require("../config/responceHandler")
const ApiError = require("../utils/ApiError")
const RealtimeRepo = require('../repo/RealtimeRepo')

const isPending = async (req, res, next) => {
    try {
        const requestId = req.body._id
        const isRequest = await RealtimeRepo.findById(requestId)
        if(!isRequest){
            return badRequest(res, 'Request ID is not valid.', [])
        }
        if(isRequest.status !== RealtimeRepo.RequestStatus.request){ // Not Pending
            return badRequest(res, 'Request is Already been Processed.', [], 403)
        }
            
       
        next()
    } catch (err) {
      next(new ApiError(400, 'Request ID is not Correct!!'))
    }
  }
  
  module.exports = isPending