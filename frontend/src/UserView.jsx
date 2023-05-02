import axios from 'axios';
import './App.css'
//import { Card, CardContent} from '@material-ui/core';
import {NavBar}  from './NavBar';
import { useState,useEffect } from 'react';
import {Card,CardContent} from '@material-ui/core';
const PAPERS_URL = 'http://localhost:5050/home/papers';


export default function  UserView(){
    const [papers, setPapers] = useState([]);
    //console.log(papers);

    async function loadPapers() {
        const token = localStorage.getItem("token");
        const response = await axios.get(PAPERS_URL, {
          headers: { authorization: `Bearer ${token}` },
        }).catch((e) => {console.log(e);})
        const loadedArray = response.data; // extract the array data from the response object
        return loadedArray;
      }
    useEffect(() => {
        async function fetchData() {
          const loadedArray = await loadPapers();
          setPapers(loadedArray);
          //console.log(loadedArray);
        }
        fetchData();
    }, []);
    const cardLoad = papers.map((paper) => {
      <Card style={{margin:'auto','border-radius': '12px','box-shadow': 'rgb(0 0 0 / 16%) 1px 1px 10px'}}>
            
            <CardContent>
            <h3>Login</h3>
            
              
              
    
               
             </CardContent>
          </Card>
    })

        

    return (
        <div id='container'>
        <NavBar/>
        
        
        </div>
    )

}