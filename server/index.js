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
            "INSERT INTO todos (description) VALUES($1) RETURN *", // This will insert the data into the table we created on our database
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

app.listen(8000, () => console.log("Server is runnong on port 8000"))