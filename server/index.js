const express = require('express')
const cors = require('cors')

const jwtauth = require('./middleware/jwtauth')
//const connectDB = require('./configs/db')

const authController = require('./controllers/authController')
const shiftsController = require('./controllers/shiftsController')

const app = express()

//connectDB()

app.use(cors())
app.use(express.json())
//app.use(jwtauth)
app.use('/auth', authController);
app.use('/shifts', jwtauth, shiftsController);

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`node final project listening on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})
