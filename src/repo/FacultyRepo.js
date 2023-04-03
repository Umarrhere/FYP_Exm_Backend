const FacultyModel = require('../models/FacultyModel')
const ApiError = require('../utils/ApiError')

/**
 * @returns {Array}
 */
const getAllFaculty = async () => {
    return await FacultyModel.find({}).sort({createdAt: 1})
  };

/**
 * @param Object
 * @returns {FacultyModel}
 */
const createByObject = async (obj) => {
    return await FacultyModel.create(obj)
  };

   /**
 * @param id
 * @param Object
 * @returns {FacultyModel}
 */
const updateById = async (id, payload) => {
  try{
    return await FacultyModel.findOneAndUpdate(
      { _id: id },
      {$set : payload},
      {new: true} 
  )
  }catch(err){
    throw new ApiError(400, 'InCorrect Nurse ID!')
  }
};


   /**
 * @param id
 * @param Object
 * @returns {FacultyModel}
 */
   const pushById = async (id, payload) => {
    try{
      return await FacultyModel.findOneAndUpdate(
        { _id: id },
        {$push : payload},
    )
    }catch(err){
      throw new ApiError(400, 'InCorrect Nurse ID!')
    }
};

     /**
 * @param id
 * @param Object
 * @returns {FacultyModel}
 */
   const pullById = async (id, payload) => {
    try{
      return await FacultyModel.findOneAndUpdate(
        { _id: id },
        {$pull : payload},
    )
    }catch(err){
      throw new ApiError(400, 'InCorrect Nurse ID!')
    }
};




  /**
 * @param Object
 * @returns {FacultyModel}
 */
const findOneByObject = async (obj) => {
  return await FacultyModel.findOne(obj)
};

 /**
 * @param id
 * @returns {FacultyModel}
 */
 const findById = async (id) => {
  try{
    return await FacultyModel.findOne({_id: id})
  }catch(err){
    return null
  }
    
};


 /**
 * @param match
 * @param condition
 * @param option
 * @returns {FacultyModel}
 */
 const updateByObj = async (match, condition, option) => {
  try{
    return await FacultyModel.findOneAndUpdate(match, condition, option)
  }catch(err){
    return null
  }
    
};

/**
 * * 
 * @param match
 * @param condition
 * @param option
 * @returns {FacultyModel}
 */
const updateManyByObject = async (match, condition, option) => {
  try{
    return await FacultyModel.updateMany(match, condition, option)
  }catch(err){
    return null
  }
    
};






module.exports = {
    getAllFaculty,
    createByObject,
    updateById,
    pushById,
    pullById,
    findOneByObject,
    findById,
    updateByObj,
    updateManyByObject,



    
}