import React from "react";
import Card from '@material-ui/core/Card';
import { CardHeader,CardContent, IconButton, Typography } from "@material-ui/core";
export default function PaperCard({paper}){
    return (
        <div>
            <Card elevation={4}>
                <CardHeader action={
                    <IconButton onClick={()=>console.log('delete!!!')}>
                        <DeleteOutlined />
                    </IconButton>
                }
                title={paper.title}
                subheader={paper.author}
                />
            </Card>
            <CardContent>
                <Typography>
                    {paper.type}
                    {paper.journal_conf_name}
                    {paper.DOI}
                    {paper.association}
                    {paper.Paper_Score}
                </Typography>
            </CardContent>
        </div>
    )
}