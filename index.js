// implement your API here
const express = require("express")    
const db = require('./data/db')

const server = express()
const port = 5000
server.use(express.json()) // <<<<<<<<<<<<<<<<<<<<<<< important to parse json from body

server.get('/', (req, res) => {
  res.send( {api: 'running like wind'})
})

server.post('/api/users', (req, res) => {
  const user = req.body
  db.insert(user)
    .then( rex => {
      res.status(200).json(rex)
    })
    .catch(err => {
      console.log('you done goofed with:', err)
      res
      .status(500)
      .json({errorMessage: 'error posting list of user to database'})
    })
})

server.get('/api/users', (req, res) => {
  db.find()
  .then( users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log('you done goofed with:', err)
    res
    .status(500)
    .json({errorMessage: 'error getting list of users from database'})
  })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id)
  .then( user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log('you done goofed with:', err)
    res
    .status(500)
    .json({errorMessage: 'error getting list of hubs from database'})
  })
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.remove(id)
  .then(removed => {
    console.log("deleted", res)
    if(removed) res.status(200).json({message:'user deleted', req})
    else res.status(404).json({message:'user not found'})  })
  .catch(err => {
    console.log('you done goofed with:', err)
    res
    .status(500)
    .json({errorMessage: 'error deleting thing from database'})
  })
})

server.put('/api/users/:id', (req, res) => {
  db.update(id,user)
  .then( user=> {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log('you done goofed with:', err)
    res
    .status(500)
    .json({errorMessage: 'error getting list of hubs from database'})
  })
})

server.listen(port, () => {
  console.log(`\n API running on port ${port} \n`)
});
