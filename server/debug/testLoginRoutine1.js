//TODO: create tests from this script (sanity? smoke?)
const axios = require('axios');

const LOGIN_URL = 'http://localhost:3000/auth/login'
const SHIFTS_URL = 'http://localhost:3000/shifts'
const USERS_URL = 'http://localhost:3000/users'


const login = async () => {
    const loginData = {
        username: "Bret",
        password: "Sincere@april.biz"
    }

    try {
        var {data} = await axios.post(LOGIN_URL, loginData, { headers: {'Content-Type': 'application/json'} })
        console.log("login successful.",data)
        //loginUser(data.accessToken,data.user.username,data.user.fullName)
    }catch(error){
        console.log(error)
    }
    const accessToken = data.accessToken
    let headers = {'x-access-token': "Bearer " + accessToken}
    try {
        const {data: shifts} = await axios.get(SHIFTS_URL, { headers: headers })
        console.log('shifts',shifts)
    }catch(error){
        console.log("shifts", error?.response?.data)
    }
    headers = {'x-access-token': "Bearer " + accessToken}

    //headers = {'x-access-token': "Bearer " + "undefined"} // should fail correctly and the server must not crash (add another check that the server is alive after this call)
    try {
        const {data: users} = await axios.get(USERS_URL, { headers: headers })
        console.log('users',users)
    }catch(error){
        console.log("users", error)
    }
}

login()