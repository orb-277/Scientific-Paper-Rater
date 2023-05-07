import axios from 'axios';
import './App.css'
//import { Card, CardContent} from '@material-ui/core';
import {AdminNavBar}  from './AdminNavBar';
import { useState,useEffect } from 'react';
import {ButtonBase, Card,CardContent, Typography} from '@material-ui/core';
import PaperCard from './PaperCard'
import { Grid,Container } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {AppBar,Toolbar,IconButton,Stack,Button} from '@mui/material';
const PAPERS_URL = 'http://localhost:5050/admin/users';





export default function  AdminView(){
    //const [papers, setPapers] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    //console.log(papers);


    async function loadUsers() {
        const token = localStorage.getItem("token");
        const response = await axios.get(PAPERS_URL, {
          headers: { authorization: `Bearer ${token}` },
        }).catch((e) => {console.log(e);})
        const loadedArray = response.data;
        console.log(loadedArray) // extract the array data from the response object
        return loadedArray;
      }
    useEffect(() => {
        async function fetchData() {
          const loadedArray = await loadUsers();
          setUsers(loadedArray);
          console.log(loadedArray);
        }
        fetchData();
    }, []);
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
        // <Container>
        // <NavBar/>
        // <h2 className='blackh2'>Your Papers:</h2>
        
          
        //   {cardLoad}

          
        
        <>
        <AdminNavBar/>
        <h2 style={{color:'black'}}>Your Users:</h2>
        {cardLoad}
        
        </>

    )

}