// implement your API here
const express = require("express")    
const db = require('./data/')

const server = express()
const port = 4000

server.get('/', (req, res) => {
  res.send( {api: 'running like wind'})
})

server.get('/hubs', (req,res) => {
  db.find()
  .then( hubs => {
    res.status(200).json(hubs)
  })
  .catch(err => {
    console.log('you done goofed with:', err)
    res
    .status(500)
    .json({errorMessage: 'error getting list of hubs from datbase'})
  })
})

server.listen(port, () => 
console.log(`\n API running on port ${port} \n`)
);
