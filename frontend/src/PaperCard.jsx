import React from "react";
import Card from '@material-ui/core/Card';
import { CardHeader,CardContent, IconButton, Typography } from "@material-ui/core";
import {DeleteOutlined} from '@material-ui/icons'
export default function PaperCard({paper}){
    console.log(paper);
    const j_c_name = paper.type+' Name';
    return (
        
            <Card elevation={4}>
                <CardHeader action={
                    <IconButton onClick={()=>alert('delete!!!')}>
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