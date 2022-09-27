import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useHttp from '../../hooks/use-http'
import { getAllComments } from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './Comments.module.css'
import NewCommentForm from './NewCommentForm'
import CommentsList from './CommentsList'

const Comments = () => {
    const params = useParams()
    const { quoteId } = params
    const [isAddingComment, setIsAddingComment] = useState(false)
    const {
        sendRequest,
        status,
        data: loadedComments,
    } = useHttp(getAllComments, true)

    const startAddCommentHandler = () => {
        setIsAddingComment(true)
    }

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])

    const addCommentHandler = useCallback(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])

    let comments

    if (status === 'pending') {
        comments = (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }

    if (status === 'completed' && loadedComments && loadedComments.length) {
        comments = <CommentsList comments={loadedComments} />
    }

    if (status === 'completed' && (!loadedComments || !loadedComments.length)) {
        comments = <p className='centered'>No comments were added yet!</p>
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={quoteId}
                    onAddedComment={addCommentHandler}
                />
            )}
            {comments}
        </section>
    )
}

export default Comments
