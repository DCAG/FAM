import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../utils/useAuth'

const USERS_URL = 'http://localhost:3000/users'

function Users() {
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const {logoutUser} = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data} = await axios.get(USERS_URL, { headers: headers })
        setUsers(data)
      }catch(error){
        if(error?.response?.data?.name=="DAILY_MAX_ACTIONS_REACHED"){
          // should i return an error component instead?
          localStorage['lastError'] = error?.response?.data?.message  
          // logout:
          //sessionStorage.clear() // TODO: replace with logout function (that calls this probably...)
          logoutUser()
          //return (<Error message={error.response.data.message} action={error.response.data.action} />)
        }
        else{
          localStorage['lastError'] = error
        }
        navigate('/error')
      }
    }

    getUsers()
    
  },[])

  return (
    <div>
        <h1>Users</h1>
        <table>
        <thead>
            <tr>
                <th>username</th>
                <th>full name</th>
                <th>remaining/max actions for today</th>
            </tr>
        </thead>
        <tbody>
        {
            users.map((user)=>{
                return (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.fullName}</td>
                        <td>{user.numOfActions}/{user.maxActions}</td>
                    </tr>
                )
            })
        }
        </tbody>
        </table>
    </div>
  )
}

export default Users