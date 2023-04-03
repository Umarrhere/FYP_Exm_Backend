const HolidayModel = require('../models/HolidayModel')

/**
 * @returns {HolidayModel}
 */
const getAllHolidays = async () => {
    return await HolidayModel.find({})
  };

  /**
   * @param year
 * @returns {HolidayModel}
 */
const getHolidaysByYear = async (year) => {
  return await HolidayModel.find({year})
};

  /**
 * @param id
 * @returns {HolidayModel}
 */
const getOneByID = async (id) => {
  return await HolidayModel.findOne({_id: id})
};


/**
 * @param object
 * @returns {HolidayModel}
 */
const createHoliday = async (year, month, day, status) => {
    return await HolidayModel.create({year, month, day, status})
  };


  /**
 * @param year
 * @returns {HolidayModel}
 */
const findByObject = async (obj) => {
    return await HolidayModel.findOne(obj)
  };

   /**
 * @param id
 * @returns {HolidayModel}
 */
const removeOneByID = async (id) => {
  return await HolidayModel.findOneAndRemove({_id: id})
};



module.exports = {
    getAllHolidays,
    getHolidaysByYear,
    getOneByID,
    createHoliday,
    findByObject,
    removeOneByID,
    


}
