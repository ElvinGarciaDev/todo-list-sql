import React, { useState, useEffect } from "react";

const ListTodos = ({todos, deleteTodos}) => {


  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Now map through the state that should have an array of all the todos. And show them on the UI*/}
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>
                {/* When you click this delete btn, it runs the deleteTodos function created above. Make sure to pass the specific id you click on*/}
                <button className="btn btn-danger" onClick={() => deleteTodos(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
