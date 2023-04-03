const { errorResponse } = require('../config/responceHandler')
const ApiError = require('../utils/ApiError')

const userAs =  (allowdUsers) => {
  try {
    return (req, res, next) => {
        const {userData} = req
        const isAllowed = allowdUsers.find(allowdUser => allowdUser === userData.role)
        if(!isAllowed)
            return errorResponse(res, 'You are not authorized to perform this action', [], 403)
       
        next()
    }
  } catch (err) {
    next(new ApiError(403, 'You are not authorized to perform this action'))
  }
}

module.exports = userAs


