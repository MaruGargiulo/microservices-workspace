import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({postId}) => {

    const [content, setContent] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        // cuando lo envía, hago un request al post de comments con el id del post
        setContent('')
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        className="form-control"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CommentCreate
