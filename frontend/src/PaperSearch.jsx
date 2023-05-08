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


const PAPER_SEARCH_URL = 'http://localhost:5050/admin/papers/search';



function PaperSearch() {
  const [papername, setPapername] = useState('');
  
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  //console.log(papers);
  const handleDelete = (paperId) => {
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
        
      }).then(function (response) {
          //handle success
          console.log(response);
          //navigate("/admin/userDetails");
          axios.get(PAPER_SEARCH_URL, { params: { papername },headers: { authorization: `Bearer ${token}` } })
      .then(response => {
        // update the state with the updated list of papers
        setPapers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
          //window.location.reload();
        })
        .catch(function (response) {
          //handle error
          alert('Delete Failed');
          console.log(response);
        });
    
}


  const cardLoad = papers.map((paper) => {
    
    return (
    
    <PaperCard paper={paper} handleDelete={handleDelete}/>
    
    )
})

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

        const response = await axios.get(PAPER_SEARCH_URL, {
          params: { papername },
          headers: { authorization: `Bearer ${token}` },
        });
        setPapers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [papername]);




  return (
    <>
    <AdminNavBar/>
    <div>
    <TextField id="outlined-basic" label="Paper Title" variant="outlined" 
              placeholder="Search by username"
              value={papername}
              onChange={(event) => {setPapername(event.target.value);}}
    
    />
    </div>
    <div>{cardLoad}</div>
      
    </>
  );
}

export default PaperSearch;