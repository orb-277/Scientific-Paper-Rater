import { Card, CardContent, FormLabel, MenuItem, Typography,Button } from '@material-ui/core';
import { selectClasses } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik ,useField,useFormikContext} from 'formik';
import { CheckboxWithLabel, Select, TextField } from 'formik-material-ui';

import { useState,useContext } from 'react';

import {Link, useNavigate} from 'react-router-dom'
import { AuthContext as AuthContext } from './context/AuthProvider';

const LOGIN_URL = 'http://localhost:5050/login';
const ADMIN_URL = 'http://localhost:5050/admin/users';
import './App.css'

import * as Yup from 'yup';

export default function Login() {
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();


    const validationSchema = Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required().min(8,"Password must be at least 8 characters")
    });

    const handleSubmit = async (values,helpers) => {
      let LoginSuccess = false;
      
      



        axios({
            method: "post",
            url: LOGIN_URL,
            data: values,
            
          })
            .then(function (response) {
              //handle success
              console.log(response);
              const accesstoken = response.data.auth_token;
              const privilege = response.data.privilege;
              console.log(accesstoken);
              localStorage.setItem('token',accesstoken);
              localStorage.setItem('privilege',privilege);
              LoginSuccess = true;
              localStorage.setItem('username',values['username']);
              if(privilege === 0){
                navigate("/admin");

              }
              else{
              navigate("/user");
              }
              
              

            })
            .catch(function (response) {
              //handle error
              alert('Login Failed');
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

        <div id = 'logincontainer'>
        
        <Card style={{width:'50%',margin:'auto','border-radius': '12px','box-shadow': 'rgb(0 0 0 / 16%) 1px 1px 10px'}}>
            
          <CardContent>
          <h3>Login</h3>
            
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

                
                
                <button type='submit' style={{width:'50%',color: 'yellow', backgroundColor: 'orange', borderColor: 'green'} }>Submit</button>
                

                </Form>
            )}
            </Formik>
            <p>New user?<Link to='/register'>Register Here</Link></p>
  
             
           </CardContent>
        </Card>
        </div>
        
    )
}