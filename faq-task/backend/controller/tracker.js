const {
    requestPasswordReset,
    resetPassword,
  } = require("./auth.services");
const userModel = require('../model/userSchema')
const validator = require('email-validator')
const randString = require('../utilities/randString')
const sendEmail = require('../utilities/sendEmail')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../config')


exports.register = async( req, res) =>{
    try {
        const {email} = req.body.user
        const {userName} = req.body.user
        const {password} = req.body.user
        console.log(email)
    if(validator.validate(email)) {
        const uniqueString = randString ()
        const isValid = false
        const hashedPassword = bcrypt.hashSync(password, 8)

        const user = {
            userName : userName,
            password : hashedPassword,
            email : email,
            uniqueString : uniqueString,
            isValid : isValid
        }

        const newUser = await userModel.create(user)
        console.log(newUser)
        await sendEmail.sendEmail(email, uniqueString, 1)
        if(newUser){
            var token = jwt.sign({ id: newUser._id }, config.secret, {
                expiresIn: 86400
            })
            res.status(200).json({
                status : 'success',
                message : 'user added temporarily',
                token: token
            })
        }else {
            res.status(400).json({
                status : 'faield',
                message : 'user not added'
            })
        }
    }
    }catch(err){
        res.status(400).json({
            status : 'failed',
            message : 'Error Ocuured'
        })
    }

}

exports.verifyUser = async(req, res) => {
    const {uniquestring} = req.params
    const {action} = req.params

    console.log(`uniqueString is ${uniquestring}`)
    const user = await userModel.findOne({ uniqueString: uniquestring})

        if (user) {
            if(action ==1 ){
                await userModel.updateOne(
                    {uniqueString: uniquestring},
                    {$set : {isValid : true}},
                    {new : true}
                )
                await sendEmail.sendEmailAfterRegistration(user.email)
                res.status(200).json({
                    status : 'valid',
                    message : 'User added permanently'
                })

            }else if(action ==2 ){
                await sendEmail.sendEmailAfterLogin(user.email)
                res.status(200).json({
                    status : 'valid',
                    message : 'User login successfully'
                })

            }
            
        }else {
            res.status(400).json({
                status : 'invalid',
                message : 'User not found'
            })
        }

 }




exports.getUsers = async(req, res) => {

    const user = await userModel.find()
    if (user){
        // const password = user[0].password
        // console.log(user[0].password)
        // var isSame = bcrypt.compareSync(req.body.password, password)
        // console.log(isSame)
        res.status(200).send(user)
    }
    else {
        res.status(200).json({
            message : 'no user'
        })
    }
}
//"password"
//"abcdeddfk@gmail.com"
exports.login = async (req, res) => {
    try {
        console.log(req)
        userModel.findOne({ email : req.body.user.email} , function(err, user) {
            if(err){
                res.status(500).json({
                    status : 'failed',
                    message : 'Error on the server'
                })
            }
            if (!user) {
                res.status(404).json({
                    status : 'failed',
                    message : 'User not found'
                })
            }
            
            console.log(user.password)

            var passwordIsValid = bcrypt.compareSync(req.body.user.password, user.password)
            if(!passwordIsValid){
                res.status(401).json({
                    status : 'failed',
                    auth :false,
                    message : 'Enter correct password'
                })
            }
            if(user.isValid == false ){
                res.status(404).json({
                    status : 'failed',
                    message : 'User is not valid. Complete Registration first !!'
                })
            }
            else {
                sendEmail.sendEmail(user.email, user.uniqueString, 2)
                var token = jwt.sign({id:user._id}, config.secret , {
                    expiresIn: 84000
                });
                console.log(token)
                res.status(200).json({
                    auth : true,
                    token : token
                })
            }   
        } )
    }catch(err){
        res.status(200).json({
            message : err
        })
    }
}

exports.resetPasswordRequestController = async (req, res, next) => {
    // console.log(req.body.user)
    const requestPasswordResetService = await requestPasswordReset(
      req.body.user.email
    );
    return res.json(requestPasswordResetService);
  };

exports.resetPasswordController = async (req, res, next) => {

    const resetPasswordService = await resetPassword(
      req.body.res.userId,
      req.body.res.token,
      req.body.res.password
    );
    return res.json(resetPasswordService);
  };


exports.update = async (req, res) =>{
    const password = req.body.password
    const email = req.body.email 
    const hashedPassword = bcrypt.hashSync(password, 8)
    const user = await userModel.updateOne(
        {email: email},
            {$set : {password : hashedPassword}},
            {new : true}
    )
    if(user){
        res.status(200).send(user)
    }



}










