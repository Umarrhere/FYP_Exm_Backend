const HolidayModel = require('../models/HolidayModel')
const FacultyModel = require('../models/FacultyModel') 
const StudentModel = require('../models/StudentsModel') 
const RealtimeModel = require('../models/RealtimeModel')
const RecordModel = require('../models/RecordModel')
const UserModel = require('../models/UserModel') 


/**
 * @returns {Object}
 */
const getAllData = async () => {
    const Nurses = await FacultyModel.find({})
    const Patients = await StudentModel.find({})
    const Realtime = await RealtimeModel.find({})
    const Holiday = await HolidayModel.find({})
    const Users = await UserModel.find({})
    const data = {
        Nurses,
        Patients,
        Realtime,
        Holiday,
        Users
    }
    return data;
  };


  /**
 * @returns {Object}
 */
const deleteAllData = async () => {
    const Nurses = await FacultyModel.deleteMany({})
    const Patients = await StudentModel.deleteMany({})
    const Realtime = await RealtimeModel.deleteMany({})
    const Holiday = await HolidayModel.deleteMany({})
    // const Users = await UserModel.deleteMany({})
    const data = {
        Nurses,
        Patients,
        Realtime,
        Holiday,
        // Users
    }
    return data;
  };

const createRecord = async (obj) => {
    return await RecordModel.create({...obj})
}

const findRecord = async (obj) => {
    return await RecordModel.findOne(obj)
}

const updateRecordByID = async (id, obj) => {
    return await RecordModel.findOneAndUpdate({_id: id}, {$set: {...obj}}, {new: true})
}

const getAllRecords = async () => {
    return await RecordModel.find({}).sort({updatedAt: -1})
}


module.exports = {
    getAllData,
    deleteAllData,
    createRecord,
    findRecord,
    updateRecordByID,
    getAllRecords

}