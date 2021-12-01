const app = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
    switch (type) {
        case 'PostCreated':
            posts[data.id] = {
                id: data.id,
                title: data.title,
                comments: []
            }
            break
        case 'CommentCreated':
            posts[data.postId].comments.push({
                id: data.id,
                content: data.content,
                status: data.status
            }) 
            break
        case 'CommentUpdated':
            const comment = posts[data.postId].comments.find(comment => comment.id === data.id)
            comment.status = data.status
            comment.content = data.content
            break
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

// este es el endpoint que recibe los envetos del event-bus
app.post('/events', (req, res) => {
    const { type, data } = req.body

    handleEvent(type, data)

    return res.send({})
})

app.listen(4002, async () => {
    console.log('Servidor QUERY corriendo en el puerto 4002')

    const res = await axios.get('http://localhost:4005/events')

    for(let event of res.data) {
        console.log('Procesando evento', event.type)

        handleEvent(event.type, event.data)
    }

})