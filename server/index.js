const express = require('express')
const cors = require('cors')

const jwtauth = require('./middleware/jwtauth')
const actionsCounter = require('./middleware/actions')
const connectDB = require('./configs/db')

const authController = require('./controllers/authController')
const shiftsController = require('./controllers/shiftsController')
const employeesController = require('./controllers/employeesController')
const usersController = require('./controllers/usersController')
const departmentsController = require('./controllers/departmentsController')

const app = express()

connectDB()
 
app.use(cors())
app.use(express.json())
app.use('/auth', authController);
app.use('/departments', jwtauth, actionsCounter, departmentsController)
app.use('/employees', jwtauth, actionsCounter, employeesController)
app.use('/shifts', jwtauth, actionsCounter, shiftsController);
// users controller must not be affected by the actionsCounter middleware
// (viewing it is not considered an action in the system).
app.use('/users', jwtauth, usersController) 

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`node server running: http://localhost:${PORT}`)
})
