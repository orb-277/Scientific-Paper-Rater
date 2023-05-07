import axios from 'axios';

//import { Card, CardContent} from '@material-ui/core';
import {NavBar}  from './NavBar';
import { useState,useEffect } from 'react';
import {ButtonBase, Card,CardContent, Typography,TextField} from '@material-ui/core';
import PaperCard from './PaperCard'
import { Grid,Container } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {AppBar,Toolbar,IconButton,Stack,Button} from '@mui/material';
import {AdminNavBar}  from './AdminNavBar';


const USER_SEARCH_URL = 'http://localhost:5050/admin/users/search';


function UserSearch() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // const handleSearch = async (event) => {
  //   const token = localStorage.getItem("token");
  //   console.log(username);
  //   event.preventDefault();
  //   try {
  //     const response = await axios.get(USER_SEARCH_URL, {
  //       params: {username} ,
  //       headers: {authorization: `Bearer ${token}`}
  //     });
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_SEARCH_URL, {
          params: { username },
          headers: { authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [username]);

  const cardLoad = users.map((user) => {
    const handleClick=()=>{
        localStorage.setItem('userId',user._id);
        localStorage.setItem('username',user.username);
        
        navigate('/admin/userDetails');

    }


  
  return (

  <ButtonBase key={user.id} onClick={handleClick}>
    <Card>
        <CardContent>
            <Typography variant="h5">{user.username}</Typography>
            <Typography variant="subtitle1">{user.total_submissions}</Typography>
        </CardContent>
    </Card>
    </ButtonBase>

  
  )
  
  
})

  return (
    <>
    <AdminNavBar/>
    <div>
    <TextField id="outlined-basic" label="Enter Name" variant="outlined" 
              placeholder="Search by username"
              value={username}
              onChange={(event) => {setUsername(event.target.value);}}
    
    />
    </div>
      {cardLoad}
    </>
  );
}

export default UserSearch;