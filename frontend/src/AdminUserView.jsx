import axios from 'axios';
import './App.css'
//import { Card, CardContent} from '@material-ui/core';
import {NavBar}  from './NavBar';
import { useState,useEffect } from 'react';
import {ButtonBase, Card,CardContent, Typography} from '@material-ui/core';
import { CardHeader} from "@material-ui/core";
import PaperCard from './PaperCard'
import { Grid,Container } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {AppBar,Toolbar,IconButton,Stack,Button} from '@mui/material';
import {AdminNavBar}  from './AdminNavBar';
const PAPERS_URL = 'http://localhost:5050/admin/user/papers';
const USERS_DELETE_URL = 'http://localhost:5050/admin/user/delete';
import {DeleteOutlined} from '@material-ui/icons'





export default function  AdminUserView(){
    
    const [papers, setPapers] = useState([]);
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const token = localStorage.getItem('token');
    //console.log(papers);
    const navigate = useNavigate();
    const handleDelete = () => {
        console.log("Handle delete called");
        axios({
            method: "delete",
            url: USERS_DELETE_URL,
            headers:{ authorization: `Bearer ${token}` },
            data: {user_id:userId},
            
          })
            .then(function (response) {
              //handle success
              console.log(response);
              navigate("/admin");


              
              

            })
            .catch(function (response) {
              //handle error
              alert('Delete Failed');
              console.log(response);
            });

    }
    const handleDelete2 = (paperId) => {
        let PAPER_DELETE_URL = 'http://localhost:5050/admin/paper/delete';
        if(localStorage.getItem('privilege')==1){
            PAPER_DELETE_URL = 'placeholder';
        }
         
        const token = localStorage.getItem('token');
        axios({
            method: "delete",
            url: PAPER_DELETE_URL,
            headers:{ authorization: `Bearer ${token}` },
            data: {paper_id:paperId},
            
          })
            .then(function (response) {
              //handle success
              console.log(response);
              //navigate("/admin/userDetails");
              
              axios.get(PAPERS_URL, {
                params: {user_id: userId},
              headers: { authorization: `Bearer ${token}` }
              
            }).then(response => {
                // update the state with the updated list of papers
                setPapers(response.data);
              })
              .catch(error => {
                console.log(error);
              });
  
  
              
              
  
            })
            .catch(function (response) {
              //handle error
              alert('Delete Failed');
              console.log(response);
            });
  
    }

    async function loadPapers() {
        const token = localStorage.getItem("token");
        
        
        const response = await axios.get(PAPERS_URL, {
            params: {user_id: userId},
          headers: { authorization: `Bearer ${token}` }
          
        }).catch((e) => {console.log(e);})
        const loadedArray = response.data; // extract the array data from the response object
        return loadedArray;
      }
    useEffect(() => {
        async function fetchData() {
          const loadedArray = await loadPapers();
          setPapers(loadedArray);
          console.log(loadedArray);
        }
        fetchData();
    }, []);
    const cardLoad = papers.map((paper) => {
      
      return (
      
      <PaperCard paper={paper} handleDelete={handleDelete2}/>
      
      )
      
      
    })

        

    return (
        // <Container>
        // <NavBar/>
        // <h2 className='blackh2'>Your Papers:</h2>
        
          
        //   {cardLoad}

          
        
        <>
        <AdminNavBar/>
        {cardLoad}
        {/* <button onClick={handleDelete}>Delete {username}</button> */}
        
        <IconButton onClick={() => {handleDelete()}} size="large" style={{position: 'relative'}}>
                        <DeleteOutlined fontSize="inherit" />
                        

        </IconButton>
        <h6 style={{'margin-top':'0px'}}>Delete {username}?</h6>
        
        </>

    )

}