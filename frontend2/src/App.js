

import Form from './Components/Form';
import Login from './Components/Login';

import './App.css'



import {Routes,Route} from 'react-router-dom'



function App() {
  

  return (

    <Routes>
    
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Registration />} />

      <Route path="/user" element={<UserView/>} />
      <Route path="/admin" element={<admin />} /> */}
      <Route path="/form" element={<Form />} />

   
    </Routes>


  )
}

export default App



// function App() {
//   return (
//     <div className="App">
//       <h1> </h1>

//       <Login />
//     </div>
//   );
// }

// export default App;
