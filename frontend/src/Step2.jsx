import React from 'react'

function Step2 ({formData,setFormData}){
  const Journalorconf = () => {
    if(formData.type === 'Journal'){
      
      return(
        <input
        type="text"
        placeholder="Journal Name"
        value={formData.JournalName}
        onChange={(event) =>
          setFormData({ ...formData, title: event.target.value })
        }
      />
      )
    }
    else{
      
      return(
        
        <input
        type="text"
        placeholder="Conference Name"
        value={formData.ConferenceName}
        onChange={(event) =>
          setFormData({ ...formData, title: event.target.value })
        }
      />
      )

    }

  }
  return (
    <div className='Step-container'>
      
      {Journalorconf()}

    </div>
  )
}

export default Step2;