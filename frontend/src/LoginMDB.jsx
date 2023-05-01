// import React from 'react';
// import styled from 'styled-components';
// import { Form, Button } from 'react-bootstrap';
// import { Formik, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const CONTAINER = styled.div`
//   background: #F7F9FA;
//   height: auto;
//   width: 90%;
//   margin: 5em auto;
//   color: snow;
//   -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
//   -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
//   box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

//   @media(min-width: 786px) {
//     width: 60%;
//   }

//   label {
//     color: #24B9B6;
//     font-size: 1.2em;
//     font-weight: 400;
//   }

//   h1 {
//     color: #24B9B6;
//     padding-top: .5em;
//   }

//   .form-group {
//     margin-bottom: 2.5em;
//   }

//   .error {
//     border: 2px solid #FF6565;
//   }

//   .error-message {
//     color: #FF6565;
//     padding: .5em .2em;
//     height: 1em;
//     position: absolute;
//     font-size: .8em;
//   }
// `;

// const MYFORM = styled(Form)`
//   width: 90%;
//   text-align: left;
//   padding-top: 2em;
//   padding-bottom: 2em;

//   @media(min-width: 786px) {
//     width: 50%;
//   }
// `;

// const BUTTON = styled(Button)`
//   background: #1863AB;
//   border: none;
//   font-size: 1.2em;
//   font-weight: 400;

//   &:hover {
//     background: #1D3461;
//   }
// `;

// // RegEx for phone number validation
// const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// // Schema for yup
// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//   .min(2, "*Names must have at least 2 characters")
//   .max(100, "*Names can't be longer than 100 characters")
//   .required("*Name is required"),
//   email: Yup.string()
//   .email("*Must be a valid email address")
//   .max(100, "*Email must be less than 100 characters")
//   .required("*Email is required"),
//   phone: Yup.string()
//   .matches(phoneRegExp, "*Phone number is not valid")
//   .required("*Phone number required"),
//   blog: Yup.string()
//   .url("*Must enter URL in http://www.example.com format")
//   .required("*URL required")
// });

// const LoginMDB = () => {
//   return (
//     <CONTAINER>

//       <Formik
//         initialValues={{ name:"", email:"", phone:"", blog:""}}
//         validationSchema={validationSchema}
//         onSubmit={(values, {setSubmitting, resetForm}) => {
//             // When button submits form and form is in the process of submitting, submit button is disabled
//             setSubmitting(true);

//             // Simulate submitting to database, shows us values submitted, resets form
//           setTimeout(() => {
//             alert(JSON.stringify(values, null, 2));
//             resetForm();
//             setSubmitting(false);
//           }, 500);
//         }}
//       >
//         {/* Callback function containing Formik state and helpers that handle common form actions */}
//       {( {values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting }) => (
//         <MYFORM onSubmit={handleSubmit} className="mx-auto">
//           {console.log(values)}
//           <Form.Group controlId="formName">
//             <Form.Label>Name :</Form.Label>
//             <Form.Control
//               type="text"
//               /* This name property is used to access the value of the form element via values.nameOfElement */
//               name="name"
//               placeholder="Full Name"
//               /* Set onChange to handleChange */
//               onChange={handleChange}
//               /* Set onBlur to handleBlur */
//               onBlur={handleBlur}
//               /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
//               value={values.name}
//               /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
//               className={touched.name && errors.name ? "error" : null}
//               />
//               {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
//               {touched.name && errors.name ? (
//                 <div className="error-message">{errors.name}</div>
//               ): null}
//           </Form.Group>
//           <Form.Group controlId="formEmail">
//             <Form.Label>Email :</Form.Label>
//             <Form.Control
//               type="text"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.email}
//               className={touched.email && errors.email ? "error" : null}
//             />
//             {touched.email && errors.email ? (
//                 <div className="error-message">{errors.email}</div>
//               ): null}
//           </Form.Group>
//           <Form.Group controlId="formPhone">
//             <Form.Label>Phone :</Form.Label>
//             <Form.Control
//               type="text"
//               name="phone"
//               placeholder="Phone"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.phone}
//               className={touched.phone && errors.phone ? "error" : null}
//               />
//               {touched.phone && errors.phone ? (
//                 <div className="error-message">{errors.phone}</div>
//               ): null}
//           </Form.Group>
//           <Form.Group controlId="formBlog">
//             <Form.Label>Blog :</Form.Label>
//             <Form.Control
//               type="text"
//               name="blog"
//               placeholder="Blog URL"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.blog}
//               className={touched.blog && errors.blog ? "error" : null}
//               />
//               {touched.blog && errors.blog ? (
//                 <div className="error-message">{errors.blog}</div>
//               ): null}
//           </Form.Group>
//           <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
//             Submit
//           </BUTTON>
//         </MYFORM>
//       )}
//       </Formik>
//     </CONTAINER>
//   );
// }


// export default LoginMDB;

import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function LoginMDB() {
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4">Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div>

    </MDBContainer>
  );
}

export default LoginMDB;