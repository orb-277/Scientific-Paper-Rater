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
      // fetch("http://localhost:5050")
      // .then
    }
    return () => {
      isCurrent = false;
    };
  }),[doi,setFieldValue,props.name];

  return(
    <>
    <Field {...props} {...field} />
    

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
      <Card style={{width:'700px'}}>
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
          <h1>Step1</h1>
          

          <div>
          
          <label>DOI:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>


          <Field name = "doi" component={TextField}/>
          </div>
          <div>
          <label>Association: </label>
          
          <Assoc name = "assoc" component={TextField} />
          </div>
          
          
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
          <h1>Step2</h1>
          <div>
          
          <Field name="Type" label="Type" component={Select} onChange={choiceChange}>
          <MenuItem value={'Journal'}>Journal</MenuItem>
          <MenuItem value={'Conference'}>Conference</MenuItem>

          </Field>
          </div>
          {choice === 'Journal' ? (
          <Field name = "JournalName" component={TextField} label="JournalName" />            
          ):(
          <div>
          <div>
            
          <Field name = "ConferenceName" component={TextField} label="ConferenceName" />

          </div>
          <div>
          <Field name="ConferenceType" label="ConferenceType" component={Select} width={'100%'}>
          <MenuItem value={'National'}>National</MenuItem>
          <MenuItem value={'International'}>International</MenuItem>

          </Field>
          </div>
          </div>

          )
          }
          
          <div>
          <button type = "button" onClick={() => props.prev(formProps.values)} style={{float:'left'}}>Back</button>
          <button type= "submit" style={{float:'right'}}>Submit</button>
          <br></br>
          </div>
          

        </Form>
      )}
    </Formik>
  )
}

