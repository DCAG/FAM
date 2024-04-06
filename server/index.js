const express = require('express')
const cors = require('cors')

const jwtauth = require('./middleware/jwtauth')
const actionsCounter = require('./middleware/actions')
const connectDB = require('./configs/db')

const authController = require('./controllers/authController')
const shiftsController = require('./controllers/shiftsController')
const employeesController = require('./controllers/employeesController')
const usersController = require('./controllers/usersController')

const app = express()

connectDB()
 
app.use(cors())
app.use(express.json())
// app.use(actionsCounter())
app.use('/employees', jwtauth, actionsCounter, employeesController)
app.use('/auth', authController);
app.use('/shifts', jwtauth, actionsCounter, shiftsController);
app.use('/users', jwtauth, usersController) // users controller must not be affected by the actionsCounter middleware (viewing it is not considered an action in the system).

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`node final project: http://localhost:${PORT}`)
})
