const RealtimeModel = require('../models/RealtimeModel')

const RequestStatus = {
    request : 'requested',
    approved: 'approved',
    rejected: 'rejected'
}

/**
 * @param req
 * @returns {Response}
 */
const createRequest = async (req) => {
    return await RealtimeModel.create(
        {
          method: req.method,
          title: req.title ?? 'Anonymous Request',
          request: req.responseURL,
          status: RequestStatus.request,
          data: req.body,
        })
  };


  /**
 * @param req
 * @returns {Response}
 */
const updateOneById = async (id, payload) => {
    return await RealtimeModel.findOneAndUpdate({ _id: id}, {$set: payload}, {new: true})};


 /**
 * @param id
 * @returns {Response}
 */
 const removeOneById = async (id) => {
    return await RealtimeModel.findOneAndRemove({_id: id})};

/**
 * @param id
 * @returns {PatientModel}
 */
const findById = async (id) => {
    return await RealtimeModel.findOne({_id: id})};








module.exports = {
    RequestStatus,
    createRequest,
    updateOneById,
    removeOneById,
    findById,


}