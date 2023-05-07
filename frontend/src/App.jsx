
import './App.css'
import Multiform from './MultiForm'
import Login from './Login'
import Registration from './Registration'
import  UserView  from './UserView'



import {Routes,Route} from 'react-router-dom'
import AdminView from './AdminView'
import AdminUserView from './AdminUserView'



function App() {
  

  return (

    <Routes>
    
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route path="/user" element={<UserView/>} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/admin/userDetails" element={<AdminUserView/>}/>
      <Route path="/form" element={<Multiform />} />

   
    </Routes>


  )
}

export default App
