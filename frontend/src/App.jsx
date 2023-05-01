
import './App.css'
import Multiform from './MultiForm'
import Login from './Login'
import Registration from './Registration'
import { NavBar } from './NavBar'
import LoginMDB from './LoginMDB'
import {Routes,Route} from 'react-router-dom'
import Layout from './Layout'


function App() {
  

  return (

    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />

      <Route path="user" element={<user/>} />
      <Route path="admin" element={<admin />} />
      <Route path="form" element={<Multiform />} />

    </Route>
    </Routes>


  )
}

export default App
