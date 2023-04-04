import React, { useState, useEffect } from "react";

const EditTodo = ({ todo, updateDescription }) => {
  const [description, setDescription] = useState(todo.description);


  const handleClick = (e) => {
    e.preventDefault();

    // Send the value of the input box. So we can send the value using a fetch call to the backend
    // This updateDescription function is declared in App.js
    updateDescription({ description, todo });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription.todo.description}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"


                // When the user clicks the update button. Call the handleClick function declared up top. This function will then call another function declared in App.js
                onClick={handleClick}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => todo.description}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
