import React from "react";
import Card from '@material-ui/core/Card';
import { CardHeader,CardContent, IconButton, Typography } from "@material-ui/core";
import axios from 'axios'
import { withStyles } from "@material-ui/core/styles";
import {DeleteOutlined} from '@material-ui/icons'
import { useNavigate } from "react-router-dom";

export default function PaperCard(props){
    const navigate = useNavigate();

    console.log(props.paper);
    const j_c_name = props.paper.type+' Name';
    return (
        
            <Card elevation={4}>
                <CardHeader style={{'margin-bottom':'0px'}} action={
                    <IconButton onClick={() => props.handleDelete(props.paper._id)}>
                        <DeleteOutlined />
                    </IconButton>
                }
                
                title={<a href={props.paper.DOI}>{props.paper.title}</a>}
                
                />
            
            <CardContent style={{'margin-top':'0px','margin-right':'25px','padding-top':'0px'}}>
                <Typography>
                

                {j_c_name}: {props.paper.journal_conf_name}

                </Typography>
                <Typography>
                Association: {props.paper.association}

                </Typography>
                <Typography style={{fontSize: "1.5rem", fontWeight: "bold"}}>
                {props.paper.Paper_Score}
                </Typography>
                    
                    
                    
                    
                
            </CardContent>
            </Card>
        
    )
}