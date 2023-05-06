import axios from 'axios';
import './App.css'
//import { Card, CardContent} from '@material-ui/core';
import {NavBar}  from './NavBar';
import { useState,useEffect } from 'react';
import {Card,CardContent, Typography} from '@material-ui/core';
import PaperCard from './PaperCard'
import { Grid,Container } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {AppBar,Toolbar,IconButton,Stack,Button} from '@mui/material';
const PAPERS_URL = 'http://localhost:5050/admin/users';


const AdminNavBar = () => {
    const navigate = useNavigate();
    return (
        <AppBar position = 'static' style={{'margin-bottom':'10px'}}>
            <Toolbar>
                <Typography variant='h6' component='div' sx = {{flexGrow:1}}>Admin</Typography>
                    
            
            <Stack direction='row' spacing={2}>
                <Button color='inherit' onClick={() => {console.log('Author')}}>Author Search</Button>
                <Button color='inherit' onClick={() => {console.log('Papers')}}>Paper Search</Button>
                <Button color='inherit' onClick={() => {localStorage.removeItem('token');localStorage.removeItem('username');navigate('/login')}}>Logout</Button>
                
            </Stack>
            </Toolbar>
        </AppBar>
    )

}


export default function  AdminView(){
    //const [papers, setPapers] = useState([]);
    const [users, setUsers] = useState([]);
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
    
      
      return (
      
        <Card key={user.id}>
            <CardContent>
                <Typography variant="h5">{user.username}</Typography>
                <Typography variant="subtitle1">{user.total_submissions}</Typography>
            </CardContent>
        </Card>

      
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