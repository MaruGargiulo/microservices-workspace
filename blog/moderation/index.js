const app = require('express')()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())

app.post('/events', async (req, res) => {

    const { type, data } = req.body
    
    switch (type) {
        case 'CommentCreated':
            const status = data.content.includes('orange') ? 'rejected' : 'approved'
            await axios.post('http://localhost:4005/events',
                {
                    type: 'CommentModerated',
                    data: { 
                        id: data.id,
                        content: data.content,
                        postId: data.postId,
                        status,
                    }
                })
            break;
    }
    res.send({})
})

app.listen(4003, () => console.log('Servicio MODERATION corriendo en el puerto 4003'))