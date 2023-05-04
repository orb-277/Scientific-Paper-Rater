import React from 'react'

function Step1 ({formData,setFormData}){
  const onOptionChangeHandler = (event) => {
    setFormData({...formData,type: event.target.value})
  }
  return (
    <div className="step-container">
    <input
      type="text"
      placeholder="Title"
      value={formData.title}
      onChange={(event) =>
        setFormData({ ...formData, title: event.target.value })
      }
    />
    <input
      type="text"
      placeholder="Doi"
      value={formData.doi}
      onChange={(event) =>
        setFormData({ ...formData, doi: event.target.value })
      }
    />
    <input
      type="text"
      placeholder="Association"
      value={formData.association}
      onChange={(event) =>
        setFormData({ ...formData, association: event.target.value })
      }
    />
    <select value={formData.type} onChange={onOptionChangeHandler}>
      <option>Journal</option>
      <option>Conference</option>
    </select>
  </div>
  )
}

export default Step1;