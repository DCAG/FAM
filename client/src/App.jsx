import FAMLogo from '/factory.svg'
import './App.css'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Departments from './pages/Departments'
import EditDepartment from './pages/EditDepartment'
import NewDepartment from './pages/NewDepartment'
import Employees from './pages/Employees'
import NewEmployee from './pages/NewEmployee'
import EditEmployee from './pages/EditEmployee'
import Shifts from './pages/Shifts'
import Users from './pages/Users'
import ErrorPage from './pages/ErrorPage'
import useAuth from './utils/useAuth'

function App() {
  const navigate = useNavigate()
  // const {logout} = useAuth()
  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div>
        <center>
          <img src={FAMLogo} className="logo" alt="FAM logo" />
        </center>
        {/*TODO: implement with REDUX*/}
        <div className={!sessionStorage['accessToken']?'hide_section--default':''}>
          {sessionStorage["fullName"]??""} <br />
          {/* Actions Left: {sessionStorage["numOfActions"]??"###"} out of {sessionStorage["maxActions"]??"###"}<br /> */}
          <button onClick={logout}>Logout</button>
        </div>
        <nav className='main-nav'>
          <ul className='main-nav__items'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/Departments'>Departments</Link></li>
            <li><Link to='/Employees'>Employees</Link></li>
            <li><Link to='/Shifts'>Shifts</Link></li>
            <li><Link to='/Users'>Users</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:id/edit" element={<EditDepartment />} />
          <Route path="/departments/new" element={<NewDepartment />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="/employees/new" element={<NewEmployee />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
      <p className="read-the-docs">
        Click here for <a href='https://github.com/DCAG/FAM'>GitHub repo</a>.
      </p>
    </>
  )
}

export default App
