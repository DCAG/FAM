//import {describe, expect, test} from '@jest/globals';
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
        return data
    }catch(error){
        //console.log(error)
        throw(error.response?.data)
    }
}

const undefinedAccessToken = async () => {
    let headers = {'x-access-token': "Bearer " + undefined}
    try {
        const {data: shifts} = await axios.get(SHIFTS_URL, { headers: headers })
        //console.log('shifts',shifts)
        return shifts
    }catch(error){
        console.log(error?.response?.data)
        throw(error?.response?.data?.name??'FAILED')
    }
}

const makeRequest = async (url) => {
    try {
        const data = await login()
        const accessToken = data.accessToken
        let headers = {'x-access-token': "Bearer " + accessToken}
        const response = await axios.get(SHIFTS_URL, { headers: headers })
        //console.log(url, response)
        return response.status
    }catch(error){
        throw(error?.response?.data?.name??error)
    }
}

// IMPORTANT!
// Required setup:
// 1. Server should be running
// 2. The user should exist in users collection

describe('server access', () => {
    test("login success", async () => {
        const data = await login()
        expect(data.user.username).toBe('Bret')
    });

    test("fail correctly with undefined accessToken", async () => {
        await expect(undefinedAccessToken(USERS_URL)).rejects.toMatch('RESTRICTED_PAGE_ACCESS_INVALID_TOKEN')
    });
    
    test("get shifts", async () => {
        await expect(makeRequest(SHIFTS_URL)).resolves.toBe(200)
    });

    test("get users", async () => {
        await expect(makeRequest(USERS_URL)).resolves.toBe(200)
    });
})