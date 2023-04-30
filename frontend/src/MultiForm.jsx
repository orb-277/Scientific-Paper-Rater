import { Card, CardContent, FormLabel, MenuItem, Typography } from '@material-ui/core';
import { selectClasses } from '@mui/material';
import { ErrorMessage, Field, Form, Formik ,useField,useFormikContext} from 'formik';
import { CheckboxWithLabel, Select, TextField } from 'formik-material-ui';
import { useEffect } from 'react';
import { useState } from 'react';

import * as Yup from 'yup';

async function fetchAssoc(a){
  await new Promise((r) => setTimeout(r,500));
  return `test: ${a}`;
}

const Assoc = (props) => {
  const{
    values: {doi},
    setFieldValue,

  } = useFormikContext();
  const [field,meta] = useField(props);
  useEffect(() => {
    let isCurrent = true;
    if (doi.trim() !== ''){
      fetchAssoc(doi).then((assoc) => {
        if(!!isCurrent){
          setFieldValue(props.name,assoc)
        }

      });
    }
    return () => {
      isCurrent = false;
    };
  }),[doi,setFieldValue,props.name];

  return(
    <>
    <Field {...props} {...field} />
    {!!meta.touched && !!meta.error && <div>{meta.error}</div>}

    </>
  )
}


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
  assoc: Yup.string().required()
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
          
          <h1>Submission</h1>
          <hr></hr>
          <FormLabel>Doi :</FormLabel>
          <Field name = "doi" component={TextField} label="doi"/>
          <br></br>
          <FormLabel>Assoc :</FormLabel>
          <Assoc name = "assoc" component={TextField} />
          
          
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

