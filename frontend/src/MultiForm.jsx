import { Card, CardContent, FormLabel, MenuItem, Typography } from '@material-ui/core';
import { selectClasses } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, Select, TextField } from 'formik-material-ui';
import { useState } from 'react';

import * as Yup from 'yup';


export default function Multiform() {
  const [data,setData] = useState({
    doi:'',
    association:'',
    Journal:'',
    Conference:'',
    Type:'Journal'
    

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

const stepOneValidationSchema = Yup.object({
  doi: Yup.string().required(),
  association: Yup.string().required()
})
  
const StepOne = (props) => {
  const handleSubmit = (values,helpers) => {
    props.next(values);

  }
  return(
    <Formik
      initialValues={props.data}
      onSubmit= {handleSubmit}
      validationSchema={stepOneValidationSchema}
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

const StepTwo = (props) => {
  const [choice,setChoice] = useState(props.data['Type']);
  const choiceChange = (e) => {
    setChoice(e.target.value);
    console.log(choice);

    

}
  const handleSubmit = (values,helpers) => {
    props.next(values,true);

  }
  return(
    <Formik
      initialValues={props.data}
      onSubmit= {handleSubmit}    
    >
      {(formProps) => (
        <Form>

          <Field name="Type" label="Type" component={Select} onChange={choiceChange}>
          <MenuItem value={'Journal'}>Journal</MenuItem>
          <MenuItem value={'Conference'}>Conference</MenuItem>

          </Field>
          {choice === 'Journal' ? (
          <Field name = "JournalName" component={TextField} label="JournalName" />            
          ):(
          <div>
          <Field name = "ConferenceName" component={TextField} label="ConferenceName" />
          <Field name="ConferenceType" label="Type" component={Select}>
          <MenuItem value={'National'}>National</MenuItem>
          <MenuItem value={'International'}>International</MenuItem>

          </Field>
          </div>
          )
          }
          
          <button type = "button" onClick={() => props.prev(formProps.values)}>Back</button>
          <button type= "submit">Submit</button>
          

        </Form>
      )}
    </Formik>
  )
}

