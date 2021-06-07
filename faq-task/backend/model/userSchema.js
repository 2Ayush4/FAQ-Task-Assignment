const mongoose = require('mongoose')

mongoose.connect ('mongodb://localhost:27017/FAQUser' , {
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log('Database connection successful'))


const userScehma = mongoose.Schema (
    {
        userName : {
            type : String,
            required : [true, 'Username is mandatory']
        },
        password : {
            type : String,
            required : [true, 'Password is mandatory']
        },
        email : {
            type : String,
            required : [true, 'Password is mandatory'],
            unique : true
        },
        uniqueString : {
            type : String,
            required : [true, 'Password is mandatory'],
            unique : true
        },
        isValid : {
            type : Boolean,
            required : [true, 'Password is mandatory'],
            
        },
        lastPassword : {
            type : String
        },
        secondLastPassword : {
            type : String
        },
        thirdLastPassword : {
            type : String
        },
        
    },
     {
         timestamps : {
             createdAt : true,
             updateAt : true
         }
     }
)

const userModel = mongoose.model('User', userScehma)

module.exports = userModel;