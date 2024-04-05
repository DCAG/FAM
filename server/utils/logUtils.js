const jsonfile = require('jsonfile')

const ACTIONS_LOG_FILE = './actions.log.json'

const logActionItem = async (obj) => {
    try{
        console.log("attempting to read and write log")
        const data = await jsonfile.readFile(ACTIONS_LOG_FILE)
        data.actions = [...data.actions, {...obj}]
        jsonfile.writeFile(ACTIONS_LOG_FILE,data)
    }
    catch(error){
        console.log("error", error)
        // edge case: file doesn't exist
        if(error.code == "ENOENT" & error.syscall == "open"){
            console.log("inside ERROR -4058")
            data = {"actions":[{...obj}]}
            jsonfile.writeFile(ACTIONS_LOG_FILE,data)
        }
        else{
            throw error
        }
    }
} 

module.exports = {logActionItem}