import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/useAuth'

const LOGIN_URL = 'http://localhost:3000/auth/login'

function LoginPage() {
  const navigate = useNavigate()
  const {loginUser} = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const loginData = {
      username: username,
      password: password
    }
    
    try {
      // required headers {'Content-Type': 'application/json'}. Axios specify this by default?
      const {data} = await axios.post(LOGIN_URL, loginData)
      console.log("login successful.",data)
      loginUser(data.accessToken,data.user.username,data.user.fullName,data.user.numOfActions,data.user.maxActions)
      navigate('/shifts');
    }catch(error){
      console.log(error)
      alert(error.response?.data??error)
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