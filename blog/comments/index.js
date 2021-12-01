const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const newComment = {
        id: randomBytes(4).toString('hex'),
        content: req.body.content,
        status: 'pending'
    }

    const comments = commentsByPostId[req.params.id] || []
    comments.push(newComment)

    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: { ...newComment, postId: req.params.id }
    })

    res.status(201).send(comments)
})

// este endpoint recibe los eventos que envía el evvent-bus service
app.post('/events', async (req, res) => {
    const { type, data } = req.body

    switch (type) {
        case 'CommentModerated':
            const comments = commentsByPostId[data.postId]
            const comment = comments.find(comment => comment.id === data.id)
            comment.status = data.status
            await axios.post('http://localhost:4005/events',
                {
                    type: 'CommentUpdated',
                    data: {...comment, postId: data.postId }
                })
            break
    }

    return res.send({})
})

app.listen(4001, () => console.log('Servidor COMMENTS corriendo en 4001'))