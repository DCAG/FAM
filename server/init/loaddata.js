const connectDB = require('../configs/db');
//const shifts = require('../models/shiftsModel');
const employees = require('../models/employeesModel');
const fs = require('fs');

connectDB()

fs.readFile('./init/emploeesAssignedShifts.update.json', 'utf8', (err, jsonString) => {
//fs.readFile('./init/shifts.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);
    console.log(data);

    //shifts.insertMany(data)
    employees.insertMany(data)
    .then(function(mongooseDocuments) {
         console.log("inserted",mongooseDocuments)
    })
    .catch(function(err) {
        console.log("error",err)
    });

  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});