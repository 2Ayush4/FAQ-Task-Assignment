var nodemailer = require('nodemailer')
const user = 'bansal.ayush48@gmail.com'
const pass = 'itsme@onlyfans'

exports.sendEmail = (email, uniqueString, action) => {
    // console.log(email, uniqueString, action)
    // console.log(process.env.gmailId, process.env.password)
        var Transport = nodemailer.createTransport({
            service :"Gmail",
            
            auth :{
                user : user,
                pass : pass
            }
        })
        var mailOptions;
        let sender = "Ayush"
        subject = ''
        if (action ==1){
            subject = 'Registration Confirmation'
        }else if (action ==2){
            subject = 'Login Confirmation'
        }else if(action ==3){
            subject = 'Password Change Confirmation'
        }
        console.log(subject)
        mailOptions = {
            from : sender,
            to : email ,
            subject : subject,
            html : `Click <a href= http://localhost:2000/verify/${uniqueString}/${action}>here </a>to verfiy yourself.Thanks`
        }
        Transport.sendMail(mailOptions, function(error, response) {

            if (error){
                console.log(error)
            }else {
                console.log("Message sent")
            }
    
        })
    
    }

exports.sendEmailAfterRegistration= (email) => {
        var Transport = nodemailer.createTransport({
            service :"Gmail",
            auth :{
                user : user,
                pass : pass
            }
        })
        var mailOptions;
        let sender = "Ayush"
        mailOptions = {
            from : sender,
            to : email ,
            subject : "Registration Complete",
            html : `Welcome to our organisation !!`
        }

        Transport.sendMail(mailOptions, function(error, response) {

            if (error){
                console.log(error)
            }else {
                console.log("Message sent")
            }
    
        })
    
    }
    
    
    exports.sendEmailAfterLogin= (email) => {
        var Transport = nodemailer.createTransport({
            service :"Gmail",
            auth :{
                user : user,
                pass : pass
            }
        })
        var mailOptions;
        let sender = "Ayush"
        mailOptions = {
            from : sender,
            to : email ,
            subject : "Login Complete",
            html : `You are successfully login !!`
        }

        Transport.sendMail(mailOptions, function(error, response) {

            if (error){
                console.log(error)
            }else {
                console.log("Message sent")
            }
    
        })
    
    }