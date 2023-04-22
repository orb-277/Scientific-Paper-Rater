import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import { useState } from 'react';

export default function Multiform() {
  const [data,setData] = useState({
    doi:'',
    association:'',
    Journal:'',
    Conference:''

  })
  const [currentStep,setCurrentStep] = useState(0);
  const makeReq = (formData) => {
    console.log("make the req",formData)
  }
  const handleNextStep = (newData,final = false) => {
    setData(prev => ({...prev,...newData}));
    if(final){
      makeReq(newData);
      return

    }

    setCurrentStep(prev => prev+1)
  }
  const handlePrevStep = (newData) => {
    setData(prev => ({...prev,...newData}));
    setCurrentStep(prev => prev-1)
  }
  const steps = [<StepOne next={handleNextStep} data={data} />,
                <StepTwo prev={handlePrevStep} next={handleNextStep} data={data}/>]

    return (
      <Card>
        <CardContent>

           {steps[currentStep]}
         </CardContent>
      </Card>
    )
  }
  
const StepOne = (props) => {
  const handleSubmit = (values,helpers) => {
    props.next(values);

  }
  return(
    <Formik
      initialValues={props.data}
      onSubmit= {handleSubmit}
    >
      {() => (
        <Form>
          <Field name = "doi" component={TextField} label="doi"/>
          <Field name = "association" component={TextField} label="association"/>
          <button type="submit">Next</button>

        </Form>
      )}
    </Formik>
  )
}

const StepTwo = () => {
  const handleSubmit = (values,helpers) => {
    props.next(values,true);

  }
  return(
    <Formik
      initialValues={props.data}
      onSubmit= {handleSubmit}    
    >
      {() => (
        <Form>
          <Field name = "Journal" component={TextField} label="Journal" />
          <button type = "button" >Back</button>
          <button type="submit">Next</button>

        </Form>
      )}
    </Formik>
  )
}

