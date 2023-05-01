import { Card, CardContent, FormLabel, MenuItem, Typography } from '@material-ui/core';
import { selectClasses } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik ,useField,useFormikContext} from 'formik';
import { CheckboxWithLabel, Select, TextField } from 'formik-material-ui';
import { useEffect } from 'react';
import { useState,useContext } from 'react'
import { AuthContext as AuthContext } from './context/AuthProvider';
const LOGIN_URL = 'http://localhost:5050/login'

import * as Yup from 'yup';

export default function Login() {
    const {setAuth} = useContext(AuthContext);


    const validationSchema = Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required().min(8,"Password must be at least 8 characters")
    });

    const handleSubmit = async (values,helpers) => {
        alert(JSON.stringify(values));
        
        // const a = JSON.stringify(values["username"])
        // const b = JSON.stringify(values["password"])
        // var bodyFormData = new FormData();
        // bodyFormData.append('username', a);
        // bodyFormData.append('password', b);


        axios({
            method: "post",
            url: "myurl",
            data: values,
            
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        
        // try{

        //     const res = await axios.post(LOGIN_URL,JSON.stringify({username:a,password:b}),
        //         {
        //             headers: {'Content-Type': 'application/json'},
                    
        //         }
            
        //     )
            
            
        //     //console.log(JSON.stringify(res));
        //     //alert(JSON.stringify(res));


            

        // }
        // catch(e){
        //     alert(e);
        //     console.log(e);

        // }
    
    }

  
    return (
        
        <Card style={{width:'500px'}}>
            
          <CardContent>
          <h1>Login</h1>
            
            <Formik
                initialValues={{username:"",password:""}}
                onSubmit= {handleSubmit}
                validationSchema={validationSchema}
            >
            {() => (
                <Form >
                <div>
                <Field name = "username" component={TextField} label="Username"/>
                </div>
                <div>
                <Field name = "password" component={TextField} label="Password" type="password"/>
                </div>

                
                
                <button type="submit">Submit</button>
                

                </Form>
            )}
            </Formik>
  
             
           </CardContent>
        </Card>
        
    )
}