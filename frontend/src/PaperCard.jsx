import React from "react";
import Card from '@material-ui/core/Card';
import { CardHeader,CardContent, IconButton, Typography } from "@material-ui/core";
import {DeleteOutlined} from '@material-ui/icons'
export default function PaperCard({paper}){
    console.log(paper);
    return (
        
            <Card elevation={4}>
                <CardHeader action={
                    <IconButton onClick={()=>alert('delete!!!')}>
                        <DeleteOutlined />
                    </IconButton>
                }
                
                title={paper.title}
                // subheader={paper.author}
                />
            
            <CardContent>
                <Typography>
                    {paper.type}
                </Typography>
                <Typography>
                {paper.journal_conf_name}

                </Typography>
                <Typography>
                {paper.DOI}

                </Typography>
                <Typography>
                {paper.association}

                </Typography>
                <Typography>
                {paper.Paper_Score}

                </Typography>
                    
                    
                    
                    
                
            </CardContent>
            </Card>
        
    )
}