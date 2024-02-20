import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SHIFTS_URL = 'http://localhost:3000/shifts'

function Shifts() {
  const [shifts, setShifts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getShifts = async () => {
      const accessToken = sessionStorage['accessToken']
      console.log(accessToken)
      const headers = {'x-access-token': accessToken}
      try{
        const {data} = await axios.get(SHIFTS_URL, { headers: headers })
        setShifts(data)
      }catch(error){
        localStorage['lastError'] = error
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