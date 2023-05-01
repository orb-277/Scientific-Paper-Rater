
import './App.css'
import Multiform from './MultiForm'
import Login from './Login'
import Registration from './Registration'
import  UserView  from './UserView'
import { NavBar } from './NavBar'
import LoginMDB from './LoginMDB'
import {Routes,Route} from 'react-router-dom'



function App() {
  

  return (

    <Routes>
    
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route path="/user" element={<UserView/>} />
      <Route path="/admin" element={<admin />} />
      <Route path="/form" element={<Multiform />} />

   
    </Routes>


  )
}

export default App
