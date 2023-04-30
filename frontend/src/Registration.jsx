

import { Card, CardContent, FormLabel, MenuItem, Typography,Button } from '@material-ui/core';
import { selectClasses } from '@mui/material';
import { ErrorMessage, Field, Form, Formik ,useField,useFormikContext} from 'formik';
import { CheckboxWithLabel, Select, TextField} from 'formik-material-ui';
import { useEffect } from 'react';
import { useState } from 'react';

import * as Yup from 'yup';


export default function Registration() {

    const handleSubmit = (values,helpers) => {
        alert(JSON.stringify(values));
    
    }
    const validationSchema = Yup.object({
        Username: Yup.string().required(),
        Password: Yup.string().required().min(8,"Password must be at least 8 characters"),
        Confirm_Password: Yup.string().required().oneOf([Yup.ref("Password")],"Passwords do not Match")
    })

  
    return (
        
        <Card style={{width:'500px'}}>
        
          <CardContent>
          <h1>Registration</h1>
            
            
            <Formik
                initialValues={{Username:"",Password:""}}
                onSubmit= {handleSubmit}
                validationSchema={validationSchema}
            >
            {() => (
                <Form>
                <div><Field name = "Username" component={TextField} label="Username"/></div>
                
                <div><Field name = "Password" component={TextField} label="Password" type="password"/></div>

                <div><Field name = "Confirm_Password" component={TextField} label="Confirm Password" type="password"/></div>

                
                
                <button type="submit">Register</button>

                </Form>
            )}
            </Formik>
  
             
           </CardContent>
        </Card>
        
    )
}