// implement your API here
const express = require("express")    
const db = require('./data/db')

const server = express()
const port = 5000
server.use(express.json()) // <<<<<<<<<<<<<<<<<<<<<<< important to parse json from body

server.post('/api/users', (req, res) => {
  const user = req.body
  if(!(user.name && user.bio)) res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  else {

    db.insert(user)
    .then( rex => {
      res.status(201).json(rex)
    })
    .catch(err => {
      console.log('you done goofed with:', err)
      res
      .status(500)
      .json({errorMessage: 'error posting user to database'})
    })
  }
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
    .json({errorMessage: 'error getting users from database'})
  })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  db.findById(id)
  .then( user => {
    if(user) res.status(200).json(user)
    else res.status(404).json({errorMessage:'we couldnt find your user in our space'})
  })
  .catch(err => {
    console.log('you done goofed with:', err)
    res
    .status(500)
    .json({errorMessage: 'error getting list of hubs from database'})
  })
})

//won
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

  const id = req.params.id
  const user = req.body
  //const bio = req.body.bio
  db.findById(id)
  .then( users => {
    console.log(users)
    if(users) res.status(200).json(users)
    else res.status(404).json({message:"no user with that id found"})
  })
  // db.update(id, user)
  // .then(user => {
    //   server.put('/api/users/:id',(req,res) => {
      //     console.log()
      //   })
      // })
      
      .catch(err => {
        console.log('you done goofed with:', err)
        res
        .status(500)
        .json({errorMessage: 'error getting list of hubs from database'})
      })
  if(!user.name || !user.bio) res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  else {}
    })

server.listen(port, () => {
  console.log(`\n API running on port ${port} \n`)
});
