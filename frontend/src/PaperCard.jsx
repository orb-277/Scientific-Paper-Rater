import React from "react";
import Card from '@material-ui/core/Card';
import { CardHeader,CardContent, IconButton, Typography } from "@material-ui/core";
import axios from 'axios'
import {DeleteOutlined} from '@material-ui/icons'
import { useNavigate } from "react-router-dom";

export default function PaperCard({paper}){
    const navigate = useNavigate();
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
            
          })
            .then(function (response) {
              //handle success
              console.log(response);
              navigate("/admin/userDetails");
              
              window.location.reload();


              
              

            })
            .catch(function (response) {
              //handle error
              alert('Delete Failed');
              console.log(response);
            });

    }
    console.log(paper);
    const j_c_name = paper.type+' Name';
    return (
        
            <Card elevation={4}>
                <CardHeader action={
                    <IconButton onClick={() => handleDelete(paper._id)}>
                        <DeleteOutlined />
                    </IconButton>
                }
                
                title={<a href={paper.DOI}>{paper.title}</a>}
                // subheader={paper.author}
                />
            
            <CardContent>
                <Typography>
                

                {j_c_name}: {paper.journal_conf_name}

                </Typography>
                <Typography>
                Association: {paper.association}

                </Typography>
                <Typography style={{fontSize: "1.5rem", fontWeight: "bold" }}>
                {paper.Paper_Score}
                </Typography>
                    
                    
                    
                    
                
            </CardContent>
            </Card>
        
    )
}