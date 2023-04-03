const StudentsModel = require('../models/StudentsModel')


/**
 * @returns {Array}
 */
const getAllStudents = async () => {
    return await StudentsModel.find({})
  };

/**
 * @param Object
 * @returns {StudentsModel}
 */
const createByObject = async (obj) => {
    return await StudentsModel.create(obj)
  };

/**
 * @param id
 * @param Object
 * @returns {StudentsModel}
 */
const updateById = async (id, payload) => {
    return await StudentsModel.findOneAndUpdate(
        { _id: id },
        {$set : payload},
        { new: true}
    )};


/**
 * @param code
 * @param Object
 * @returns {StudentsModel}
 */
const updateByCode = async (code, payload) => {
  return await StudentsModel.findOneAndUpdate(
      {code},
      {$set : payload},
  )};


  /**
 * @param id
 * @returns {StudentsModel}
 */
const getOneById = async (id) => {
  try{
    return await StudentsModel.findOne({ _id: id })
  }catch(err){
    return null
  }};

  /**
 * @param code
 * @returns {StudentsModel}
 */
  const getOneByRegno = async (regno) => {
    return await StudentsModel.findOne({regno})};
  
    /**
 * @param id
 */
    const removeOneById = async (id) => {
      return await StudentsModel.findOneAndRemove({_id: id})};
    
    






  module.exports = {
    getAllStudents,
    createByObject,
    updateById,
    updateByCode,
    getOneById,
    getOneByRegno,
    removeOneById,
    

  }