import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import Error from "../components/Error"

const SHIFTS_URL = 'http://localhost:3000/shifts'

function Shifts() {
  const [shifts, setShifts] = useState([])

  const navigate = useNavigate()

  const {logoutUser} = useAuth();

  useEffect(() => {
    const getShifts = async () => {
      const accessToken = sessionStorage['accessToken']
      const headers = {'x-access-token': "Bearer " + accessToken}
      try{
        const {data} = await axios.get(SHIFTS_URL, { headers: headers })
        setShifts(data)
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

    getShifts()
    
  },[])

  return (
    <div>
        <h1>Shifts</h1>
        <ul>
        {
          shifts.map((shift, idx) => {
            return <li key={idx}>{shift.time}</li>
          })
        }
        </ul>
    </div>
  )
}

export default Shifts