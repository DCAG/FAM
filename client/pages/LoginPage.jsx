import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LOGIN_URL = 'http://localhost:3000/auth/login'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const login = async () => {
    const loginData = {
      username: username,
      password: password
    }

    const headers = {'Content-Type': 'application/json'}
    
    try {
      const {data} = await axios.post(LOGIN_URL, loginData, { headers })
      console.log("login successful.",data)
      sessionStorage['accessToken'] = data.accessToken
      navigate('/shifts');
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
        <h1>Login</h1>

        Username: <input type="text" id="username" onChange={e=>setUsername(e.target.value)} /> <br />
        Password: <input type="password" id="password" onChange={e=>setPassword(e.target.value)} /> <br />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default LoginPage