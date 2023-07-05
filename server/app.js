const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.static('../public'))
app.use(bodyParser.json())
let todos = []

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.get('/todos', (req, res) => {
  return res.status(200).json(todos)
})

app.get('/todos/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find((todo) => {
    return todo.id === Number(id)
  })

  if (todo) {
    return res.status(200).json(todo)
  } else {
    return res.status(404).send()
  }
})

app.post('/todos', (req, res) => {
  const id = Math.floor(Math.random() * 100000)
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(401).json({ msg: 'Please provide title and description' })
  }

  let newTodo = {
    id: id,
    title: title,
    completed: false,
    description: description,
  }

  todos.push(newTodo)

  return res.status(201).json(newTodo)
})

app.put('/todos/:id', (req, res) => {
  const { id } = req.params
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === Number(id)
  })

  if (todoIndex !== -1) {
    todos[todoIndex].title = req.body.title
    todos[todoIndex].completed = req.body.completed
    todos[todoIndex].description = req.body.description

    return res.status(200).json({ msg: 'todo updated' })
  } else {
    return res.status(404).send()
  }
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === Number(id)
  })

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1)
    return res.status(200).json({ msg: 'todo item deleted' })
  } else {
    return res.status(404).send()
  }
})

app.use((req, res, next) => {
  return res.status(404).json({ msg: 'Route not found' })
})

app.listen(3002)
