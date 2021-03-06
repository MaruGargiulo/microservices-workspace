const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
    const event = req.body
    events.push(event)

    //  post service
    axios.post('http://localhost:4000/events', event)
    // comment service
    axios.post('http://localhost:4001/events', event)
    // query service
    axios.post('http://localhost:4002/events', event)
    // moderation service
    axios.post('http://localhost:4003/events', event)
    
    res.send({status: 'OK'})
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => console.log('Servicio EVENT-BUS corriendo en el puerto 4005'))
