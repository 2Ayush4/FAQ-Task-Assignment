const express = require('express')
const cors = require('cors')
const router = require('./routes/route')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', router)

const port = process.env.PORT || 2000


app.listen(port, () =>{
    console.log(`Application is running at ${port}`)
})