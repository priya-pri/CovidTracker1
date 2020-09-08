import React from 'react'
import './InfoBox.css';

import  {Card,
CardContent,Typography} from "@material-ui/core";



function InfoBox({title,cases,total,...props}){//...props is spread
    //props=>title ,cases,total
    return (
        <div   className="infoBox">
            <Card  onClick={props.onClick}>
                <CardContent>
                    <Typography className="title"color="textSecondary">{title}</Typography>
                    <h2 className="cases">{cases}</h2>
                    <Typography className="total" color="textSecondary">{total} Total</Typography>

                </CardContent>
                
            </Card>

        </div>
    )
}

export default InfoBox;