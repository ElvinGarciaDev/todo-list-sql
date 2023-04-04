import React, { useState } from 'react'
const InputTodo = ({onAdd}) => {

    // The state for the input field
    const [description, setDescription] = useState("")

    // Update the state for the input box
    const hanleChange = (e) => {
        setDescription(e.target.value)
    }


    // When the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault()

        // Send the value of the input box. So we can send the value using a fetch call to the backend
        // This onAdd function is declared in App.js
        onAdd({description})

        // Empty the input in the state for both the description
        setDescription("")
    }


  return (
    <>

    <h1 className='text-center mt-5'>Todo List</h1>

    <form className='d-flex mt-5' onSubmit={handleSubmit}>
        <input type="text"  className='form-control' value={description} onChange={hanleChange}/>
        <button className="btn btn-info">Add description</button>
    </form>
    </>
  )
}

export default InputTodo