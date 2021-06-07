const jwt = require('jsonwebtoken')
const userModel = require('../model/userSchema')
// const sendEmail = require('../utilities/email/sendEmail')
const crypto = require('crypto')
const bcryptSalt = process.env.BCRYPT_SALT;
const bcrypt = require('bcryptjs')
const tokenModel = require('../model/token')

exports.requestPasswordReset = async(email) => {
    const user = await userModel.findOne({email : email})
    if (!user ){
        throw new Error("user does not exist")

    }
    let prevtoken = await tokenModel.findOne({userId : user._id})
    if (prevtoken){
        await prevtoken.deleteOne()
    }
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))

    const token  ={
        userId : user.id,
        token:hash,
        createdAt: Date.now()
    } 
    const clientURL = 'http://localhost:2000/'
    const newToken = await tokenModel.create(token);
    const link = `${clientURL}passwordReset?token=${hash}&id=${user._id}`
    const response = {
        clientURL :'http://localhost:2000/',
        token : hash ,
        id : user._id
    }
    // sendEmail(user.email, "Password Reset Request", {name:user.userName, link:link} )
    // sendEmailForPasswordResetRequest(user.email, link)
    return response
}


//"http://localhost:3000//passwordReset?token=e505f28fcfd91aec56d2168762a470252941e3fca3ba94fe499d3848ca414c72&id=60b8e02630aacc5ddccbd82d"
exports.resetPassword = async (userId, token, password) => {

    let passwordResetToken = await tokenModel.findOne ({userId});
    if (!passwordResetToken){
        throw new Error ("User not found")
    }

    if( token != passwordResetToken.token){
        throw new Error ("Invalid or expired password reset token")
    }
    // const isValid = await bcrypt.compare(token, passwordResetToken.token)
    // console.log(token)
    // console.log(passwordResetToken.token)
    // if(!isValid){
    //     throw new Error ("Invalid or expired password reset token")
    // }

    // lastPassword = 

    
    const user = await userModel.find({_id : userId}, {password : 1, lastPassword : 1, secondLastPassword : 1,  _id : 0})
    console.log(user)
    const lastPassword = user[0].lastPassword
    const secondLastPassword = user[0].secondLastPassword
    const current_password = user[0].password
    console.log(current_password)
    if (lastPassword){
        const isValid_1 = await bcrypt.compare(lastPassword, password)
        if(isValid_1){
            return false
        }
    }
    if (secondLastPassword){
        const isValid_2 = await bcrypt.compare(secondLastPassword, password)
        if(isValid_2){
            return false
        }
    }
    if (current_password){
        const isValid_3 = await bcrypt.compare(current_password, password)
        if(isValid_3){
            return false
        }
    }
    const hashedPassword = bcrypt.hashSync(password, 8)


    await userModel.updateOne(
        {_id : userId},
        {$set : 
            {
                secondLastPassword : lastPassword,
                lastPassword: current_password, 
                password: hashedPassword,

            }}, 
        {new : true}
    );
    const updateduser = await userModel.find({_id : userId}, {password : 1, lastPassword : 1, secondLastPassword : 1,  _id : 0})
    console.log(updateduser)
    // const user = await userModel.findById({_id :userId })
    // sendEmail ( user.email, "Password Reset Successfully", 
    // {name: user.userName,})

    await passwordResetToken.deleteOne();
    return true
}