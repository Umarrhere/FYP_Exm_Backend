const UserRepo = require('../repo/UserRepo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { badRequest, errorResponse, successResponse } = require('../config/responceHandler')

const createNewUser = async (req, res, next) => {
    try{
        const {name, email, password} = req.body

        // Testing Email Format
        const isEmail =  /(.+)@(.+){2,}\.(.+){2,}/.test(email)
        if(!isEmail){
            return badRequest(res, 'Email Should be Correct!', email)
        }

        // Encrypting Password
        var salt = bcrypt.genSaltSync(10);
        var hashPass = bcrypt.hashSync(password, salt);
        
        const newUser = await UserRepo.createUser(name, email, hashPass)
        if(!newUser){
            return errorResponse(res, 'Issue Occured in Server', [], 500)
        }

        successResponse(res, 'User Created Successfully', newUser)

    }catch(err){
        next(err)
    }
}


const login = async (req, res, next) => {
   try{
        const {email, password} = req.body
        let User = await UserRepo.findOneByObject({email})
        if(!User){
            return badRequest(res, 'User Not Found', [])
        }
        
        const isPasswordMatch =  bcrypt.compareSync(password, User.password);
        if(!isPasswordMatch){
            return badRequest(res, 'Password Does not Match!', [])
        }
        
        const userData =  {
            name: User.name,
            email,
            profileImage: User.profileImage,
            role: User.role
        }

        console.log("[UserController:login] Logged in Successfully")
        const token = jwt.sign({User}, process.env.JWT_SECRET)

        successResponse(res, 'Login Successful.', {userData, token})
   }catch(err){
     next(err)
   }
}









module.exports = {
    createNewUser,
    login,



}