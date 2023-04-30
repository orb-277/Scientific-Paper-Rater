import { Card, CardContent, FormLabel, MenuItem, Typography } from '@material-ui/core';
import { selectClasses } from '@mui/material';
import { ErrorMessage, Field, Form, Formik ,useField,useFormikContext} from 'formik';
import { CheckboxWithLabel, Select, TextField } from 'formik-material-ui';
import { useEffect } from 'react';
import { useState } from 'react';

import * as Yup from 'yup';

export default function Login() {

    const handleSubmit = (values,helpers) => {
        alert(JSON.stringify(values));
    
    }
    const validationSchema = Yup.object({
        Username: Yup.string().required(),
        Password: Yup.string().required().min(8,"Password must be at least 8 characters")
    })

  
    return (
        
        <Card style={{width:'500px'}}>
            
          <CardContent>
          <h1>Login</h1>
            
            <Formik
                initialValues={{Username:"",Password:""}}
                onSubmit= {handleSubmit}
                validationSchema={validationSchema}
            >
            {() => (
                <Form >
                <div>
                <Field name = "Username" component={TextField} label="Username"/>
                </div>
                <div>
                <Field name = "Password" component={TextField} label="Password" type="password"/>
                </div>

                
                
                <button type="submit">Submit</button>
                

                </Form>
            )}
            </Formik>
  
             
           </CardContent>
        </Card>
        
    )
}