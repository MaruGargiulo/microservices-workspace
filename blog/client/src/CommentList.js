import React from 'react'

const CommentList = ({ comments }) => {

    const getComments = () => {
        return comments.map(comment => {
            let content = comment.status === 'pending' ? 'This comment is awaiting moderation' : (comment.status === 'rejected' ? 'This comment has been rejected' : comment.content)
            return <li key={comment.id}>{content}</li>
        })
    }
    
    return (
        <div>
            <ul>
                { getComments() }
            </ul>
        </div>
    )
}

export default CommentList;