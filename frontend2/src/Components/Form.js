import React,{useState} from 'react';
import Step1 from './Step1';
import Step2 from './Step2';

const Form = () => {
    const [page,setPage] = useState(0);
    const [formData,setFormData] = useState({
      title: "",
      doi: "",
      association: "",
      type :"",
      JournalName:"",
      ConferenceName:""

    });
    const FormTitles = ["Step1","Step2"];
    const PageDisplay = () => {
      if(page === 0){
        return <Step1 formData={formData} setFormData={setFormData}/>;

      }
      else{
        return <Step2 formData={formData} setFormData={setFormData}/>;

      }
    }

  return (

    <div className="Main">
      <div className='progress'>
PPP
      </div>
      <div className='form-container'>
        <div className='header'>
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className='content'>{PageDisplay()}</div>
        <div className='footer'>
          <button disabled={page === 0}
          onClick={()=>{
            setPage((currPage) => currPage - 1);

          }

          }
          >Prev</button>
          <button 
          onClick={()=>{
            if(page === FormTitles.length - 1){
              alert("yabadabadoo");
              alert(JSON.stringify(formData));

            }
            else{
              setPage((currPage) => currPage + 1);

            }
            

          }

          }
          >{page === FormTitles.length - 1 ? "Submit" : "Next"}</button>
        </div>

      </div>
    </div>
  )
}

export default Form;