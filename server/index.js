const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())

//Routes

//Create a todo
app.post("/todos", async(req, res) => {
    try {

        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todos (description) VALUES($1) RETURNING *", // This will insert the data into the table we created on our database
            [description]
        );
        res.json(newTodo.rows[0])
        
    } catch (error) {
        console.log(error)
    }
})

//get all todo
app.get("/todos", async (req, res) => {
    try {

        const allTodos = await pool.query("SELECT * FROM todos") // Get all the data from the todos table
        res.json(allTodos.rows)
        
    } catch (error) {
        console.log(error)
    }
})

//get Single todo
app.get("/todos/:id", async (req, res) => {

    try {
        
        const {id} = req.params // get the id from the url

        // select a specific item from the todos table
        const todo = await pool.query(
            "SELECT * FROM todos WHERE id = $1",
            [id]
        );

        res.json(todo.rows[0])
    } catch (error) {
        console.log(error)
    }
})

// Update a todo
app.put("/todos/:id", async (req, res) => {

    try {
        const {id} = req.params // get the id from the url
        const {description} = req.body // Get the new description that ill update the old
    
        // Update the description of a specific item from the todos table
        await pool.query(
            "UPDATE todos SET description = $1 WHERE id = $2",
            [description, id]
        )
        res.json("Todo was updated")
    
    } catch (error) {
        console.log(error)
    }
})

app.delete("/todos/:id", async (req, res) => {

    try {
        const {id} = req.params // get the id from the url

        // Delete an item from the todos table
        await pool.query(
            "DELETE FROM todos WHERE id = $1",
            [id]
        )

        res.json("Todo was deleted")
        
    } catch (error) {
        console.log(error)
    }
})


app.listen(8000, () => console.log("Server is runnong on port 8000"))