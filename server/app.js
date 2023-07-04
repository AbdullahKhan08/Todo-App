const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
let todos = [{ title: 'gym', description: 'Go to gym ftom 7-9 pm' }]

app.get('/todos', (req, res) => {
  res.status(200).json(todos)
})

app.get('/todos/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find((todo) => {
    return todo.id === Number(id)
  })

  if (todo) {
    res.status(200).json(todo)
  } else {
    res.status(404).json({ msg: 'todo not found' })
  }
})

app.post('/todos', (req, res) => {
  const id = Math.floor(Math.random() * 100000)
  const { title, description } = req.body
  if (!title || !description) {
    res.status(401).json({ msg: 'Please provide title and description' })
  }

  let newTodo = {
    id: id,
    title: title,
    completed: false,
    description: description,
  }

  todos.push(newTodo)

  res.status(201).json({ id })
})

app.put('/todos/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find((todo) => {
    return todo.id === Number(id)
  })

  if (todo) {
    todo.title = req.body.title
    if (req.body.completed) {
      todo.completed = req.body.completed
    }
    todo.description = req.body.description

    res.status(200).json({ msg: 'todo updated' })
  } else {
    res.status(404).json({ msg: 'Todo not found' })
  }
})

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find((todo) => {
    return todo.id === Number(id)
  })

  if (todo) {
    todo.id = undefined
    todo.title = undefined
    todo.completed = undefined
    todo.description = undefined

    res.status(200).json({ msg: 'todo item deleted' })
  } else {
    res.status(404).json({ msg: 'Todo not found' })
  }
})

app.use((req, res, next) => {
  res.status(404).json({ msg: 'Route not found' })
})

app.listen(3002)
