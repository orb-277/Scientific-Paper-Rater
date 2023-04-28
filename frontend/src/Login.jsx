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
        
        <Card>
          <CardContent>
            
            <Formik
                initialValues={{Username:"",Password:""}}
                onSubmit= {handleSubmit}
                validationSchema={validationSchema}
            >
            {() => (
                <Form>
                <Field name = "Username" component={TextField} label="Username"/>
                <Field name = "Password" component={TextField} label="Password" type="password"/>

                
                
                <button type="submit">Submit</button>

                </Form>
            )}
            </Formik>
  
             
           </CardContent>
        </Card>
        
    )
}