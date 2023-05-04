import {
  Card,
  CardContent,
  FormLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { selectClasses } from "@mui/material";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useField,
  useFormikContext,
} from "formik";
import { CheckboxWithLabel, Select, TextField } from "formik-material-ui";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext as AuthContext } from "./context/AuthProvider";
import {Link, useNavigate} from 'react-router-dom';

const ASSOC_URL = "http://localhost:5050/submission/association";
const SUBMIT_URL = "http://localhost:5050/submission/submit";

import * as Yup from "yup";

const handleAssocChange = (value) => {
  setData((prevData) => ({
    ...prevData,
    assoc: value
  }));
};



const Assoc = (props) => {
  //const { setAuth } = useContext(AuthContext);
  const {
    values: { doi },
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);
  const token = localStorage.getItem("token");
  console.log(token);
  const handleDOIChange = async (event) => {
    const doi = event.target.value.trim();
    if (doi !== "") {
      try {
        const response = await axios.get(ASSOC_URL, {
          params: { doi },
          headers: { authorization: `Bearer ${token}` },
        });
        console.log(response);
        console.log(response.data);
        setFieldValue(props.name, response.data);
        props.onAssocChange(response.data); 

      } catch (error) {
        // handle error
        console.log(error);
      }
    }
  };

  return (
    <>
      <Field {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default function Multiform() {
  const [data, setData] = useState({
    title: "",
    doi: "",
    assoc: "",
    Journal: "",
    Conference: "",
    Type: "Journal",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const makeReq = (formData) => {
    console.log("make the req", formData);
  };
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeReq(newData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };
  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo prev={handlePrevStep} next={handleNextStep} data={data} />,
  ];

  return (
    <div id="logincontainer">
      <Card
        style={{
          width: "50%",
          margin: "auto",
          "border-radius": "12px",
          "box-shadow": "rgb(0 0 0 / 16%) 1px 1px 10px",
        }}
      >
        <CardContent>{steps[currentStep]}</CardContent>
      </Card>
    </div>
  );
}

const stepOneValidationSchema = Yup.object({
  title: Yup.string().required(),
  doi: Yup.string().required(),
  assoc: Yup.string().required(),
});

const StepOne = (props) => {
 
  const handleSubmit = (values, helpers) => {
    props.next(values);
    
  };


  const token = localStorage.getItem("token");
  console.log(token);
  const handleDOIChange = async (event) => {
    if (event.keyCode === 13) {
      const doi = event.target.value.trim();
      console.log(doi);
      if (doi !== "") {
        try {
          const response = await axios.get(ASSOC_URL, {
            params: { doi : doi },
            headers: { authorization: `Bearer ${token}` },
          });
          //llogic to set the association
          console.log(response.data.Association);
          if(response.data.Association === "Unknown"){
            alert("Unknown DOI,please enter it manually");
            document.getElementsByName("assoc")[0].disabled = false;
            document.getElementsByName("assoc")[0].value = "Unknown";
          }
          else
          {
            document.getElementsByName("assoc")[0].value = response.data.Association;
            //disable the field
            document.getElementsByName("assoc")[0].disabled = true; 
          }
         
        } catch (error) {
          // handle error
          console.log(error);
        }
      }
    }
  };
  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={stepOneValidationSchema}
    >
      {() => (
        <Form>
          <h1>Step1</h1>
          <div>
            

            <Field
              name="title"
              component={TextField}
              label="title"
              
            />
          </div>

          <div>
            

            <Field
              name="doi"
              component={TextField}
              label="doi"
              onKeyDown={handleDOIChange}
            />
          </div>
          <div>
           

            <Assoc
              name="assoc"
              component={TextField}
              placeholder="association"
              touched="false"
              onAssocChange={handleAssocChange}
     
             
            />
          </div>

          <button
            type="submit"
            style={{
              color: "yellow",
              backgroundColor: "orange",
              borderColor: "green",
            }}
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
};

const StepTwo = (props) => {
  const navigate = useNavigate();
  const [choice, setChoice] = useState(props.data["Type"]);
  const choiceChange = (e) => {
    setChoice(e.target.value);
    console.log(choice);
  };
  const handleSubmit = (values, helpers) => {
    //props.next(values);

    const token = localStorage.getItem("token");
    let j_c_name;
    if(values['Journal'].trim() === ''){
      j_c_name = values['Conference'];
    }
    else{
      j_c_name = values['Journal'];
    }
    axios({
      method: "post",
      url: SUBMIT_URL,
      data: {association:values['association'],title:values['title'],journal_conf_name:j_c_name,type:values['Type'],DOI:values['doi']},

      headers: { authorization: `Bearer ${token}` },
      
    })
      .then(function (response) {
        //handle success
        console.log(response);
        // const accesstoken = response.data.auth_token;
        // console.log(accesstoken);
        // localStorage.setItem('token',accesstoken);
        
        navigate("/user");
        
        

      })
      .catch(function (response) {
        //handle error
        alert('Submission Failed');
        console.log(response);
      });

    


  };
  return (
    <Formik initialValues={props.data} onSubmit={handleSubmit}>
      {(formProps) => (
        <Form>
          <h1>Step2</h1>
          <div>
            <Field
              name="Type"
              label="Type"
              component={Select}
              onChange={choiceChange}
            >
              <MenuItem value={"Journal"}>Journal</MenuItem>
              <MenuItem value={"Conference"}>Conference</MenuItem>
            </Field>
          </div>
          {choice === "Journal" ? (
            <Field
              name="JournalName"
              component={TextField}
              label="JournalName"
            />
          ) : (
            <div>
              <div>
                <Field
                  name="ConferenceName"
                  component={TextField}
                  label="ConferenceName"
                />
              </div>
              <div>
                <Field
                  name="ConferenceType"
                  label="ConferenceType"
                  component={Select}
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"National"}>National</MenuItem>
                  <MenuItem value={"International"}>International</MenuItem>
                </Field>
              </div>
            </div>
          )}

          <div>
            <button
              type="button"
              style={{
                color: "yellow",
                backgroundColor: "orange",
                borderColor: "green",
                float: "left",
              }}
              onClick={() => props.prev(formProps.values)}
            >
              Back
            </button>
            <button
              type="submit"
              style={{
                float: "right",
                color: "yellow",
                backgroundColor: "orange",
                borderColor: "green",
              }}
            >
              Submit
            </button>
            <br></br>
          </div>
        </Form>
      )}
    </Formik>
  );
};
