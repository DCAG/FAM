import React, {useState} from 'react'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'
import useAuth from '../utils/useAuth'

const LOGIN_URL = 'http://localhost:3000/auth/login'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {loginUser} = useAuth()
  const navigate = useNavigate()

  const login = async () => {
    const loginData = {
      username: username,
      password: password
    }

    const headers = {'Content-Type': 'application/json'}
    
    try {
      const {data} = await axios.post(LOGIN_URL, loginData, { headers })
      console.log("login successful.",data)
      loginUser(data.accessToken,data.user.username,data.user.fullName,data.user.numOfActions,data.user.maxActions)
      navigate('/shifts');
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
        <h1>Login</h1>

        Username: <input type="text" id="username" onChange={e=>setUsername(e.target.value)} placeholder='username of a user from jsonplaceholder' /> <br />
        Password: <input type="password" id="password" onChange={e=>setPassword(e.target.value)} placeholder='email from jsonplaceholder' /> <br />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default LoginPage