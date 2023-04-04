import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  // Send a request to the backend and get all items on the database. Add them to the state so we can display them
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const data = await response.json();

      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // This useEffect is like an eventListiner. As soon as the page loads, it calls getTodos() and getTodos does a fetch call
  // To the api and gets all the items in the database. Sets the state with them
  useEffect(() => {
    getTodos();
  }, []);

  //handle what happens when user clicks the button to submitt a new item
  const addTask = async (description) => {

    
    try {
      // Make a fetch request to the backend api and send the body. The body should have what the user typed in the input
      // The backend will make sure to store it in the database
      const res = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(description),
      });

      const data = await res.json();

      // The new task that was added will be sent back by the api
      // We need to add the new task to our current state that holds all the tasks exepect the new one. so that the ui is updated without having to refresh
      setTodos([...todos, data]);
    } catch (error) {
      console.log(error);
    }
  };

  // When user click to delete a specific task
  const deleteTodos = async (id) => {
    try {
      // Send a request to the sever and pass on the ID of the item you want to delete
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });

      // Update the state by removing the item you just deleted
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // A modal will pop up when the user clicks on the edit button. This function takes care of updating an item
  const updateDescription = async (description) => {

    try {
        
        const res = await fetch(`http://localhost:8000/todos/${description.todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(description),
          });


          // I took this code from the first react course I did with traversy media. I changed it arround to work for thos project
          // using the map method on the Tasks array. we use the tenerary oporator ? to see if the current element
          // id matches the id that came back from the doubleClick. is so, we're chaning the reminder proporty
          // to the oppisite. So if it's true it goes to false. Same other way around
          setTodos(
            todos.map((task) =>
              task.id == description.todo.id ? { ...task, description: description.description } : task
            )
          );

    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="container">
      <InputTodo onAdd={addTask} />

      {todos.length != 0 && <ListTodos todos={todos} deleteTodos={deleteTodos} updateDescription={updateDescription}/>
}
    </div>
  );
}

export default App;
