
import { Card, CardContent, FormLabel, MenuItem, Typography,Button } from '@material-ui/core';
import { selectClasses } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik ,useField,useFormikContext} from 'formik';
import { CheckboxWithLabel, Select, TextField } from 'formik-material-ui';

import { useState,useContext } from 'react';
import {Link} from 'react-router-dom'

import SvgIcon from '@mui/material/SvgIcon';
import { AuthContext as AuthContext } from './context/AuthProvider';

const REGISTER_URL = 'http://localhost:5050/register';
import './App.css'

import * as Yup from 'yup';

export default function Registration() {
    const {setAuth} = useContext(AuthContext);


    const validationSchema = Yup.object({
        username: Yup.string().required(),
        email: Yup.string().email(),
        password: Yup.string().required().min(8,"Password must be at least 8 characters"),
        confirm_password: Yup.string().required().oneOf([Yup.ref("password")],"Passwords do not Match")
    });

    const handleSubmit = async (values,helpers) => {



        axios({
            method: "post",
            url: REGISTER_URL,
            data: {username:values['username'],email:values['email'],password:values['password']}
            
          })
            .then(function (response) {
              //handle success
              console.log(response)
              if(response.status == 201){
                alert('Registration Successful');
         
                //redirect to login page
                window.location.href = '/login';

              }

            })
            .catch(function (response) {
              //handle error
              alert('Registration Failed');
              console.log(response);
            });
        



            


    
    }

  
    return (

        <div id = 'logincontainer'>
        
        <Card style={{width:'50%',margin:'auto','border-radius': '12px','box-shadow': 'rgb(0 0 0 / 16%) 1px 1px 10px'}}>
            
          <CardContent>
          <h3>Register</h3>
            
            <Formik
                initialValues={{username:"",email:"",password:"",confirm_password:""}}
                onSubmit= {handleSubmit}
                validationSchema={validationSchema}
            >
            {() => (
                <Form >
                <div>
                
                <Field name = "username" component={TextField} label="Username"/>
                </div>

                <div>
                
                <Field name = "email" component={TextField} label="email"/>
                </div>
                <div>
                <Field name = "password" component={TextField} label="Password" type="password"/>
                </div>
                <div>
                <Field name = "confirm_password" component={TextField} label="Confirm Password" type="password"/>
                </div>

                
                
                <button type='submit' style={{width:'50%',color: 'yellow', backgroundColor: 'orange', borderColor: 'green'} }>Submit</button>
                

                </Form>
            )}
            </Formik>
            <p>Already a user?<Link to='/login'>Login Here</Link></p>
  
             
           </CardContent>
        </Card>
        </div>
        
    )
}