import React, { useEffect, useState } from 'react'
import '../../css/style/comment.css'
import { getReq } from '../../lib/request'
import { useParams } from 'react-router-dom'
import Comment from '../../Components/Comment'
const fetchPost = async (id) => {
    return getReq(`/posts?id=${id}`).then(posts => posts[0]).catch()
}
const fetchPostUser = async (id) => {
    return getReq(`/users?id=${id}`).then(users => users[0]).catch()
}
const fetchComments = async (id) => {
    return getReq(`/comments?postId=${id}`).then(posts => posts).catch()
}
export default function Post({ }) {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [postUser, setPostUser] = useState(null)
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetchPost(id).then(post => setPost(post)).catch()
    }, [])
    useEffect(() => {
        fetchPostUser(post?.userId).then(user => setPostUser(user)).catch()
        fetchComments(id).then(comments => setComments(comments)).catch()
    }, [post])
    return (
        <section className="comment-section">
            <div className="overly-background" >
                <div className="comments-panel">
                    <div className="post-image">
                        <img src={post?.image} alt="post from user" />
                    </div>
                    <div className="detail-post">
                        <div className="information-post">
                            <div className="information-page">
                                <a href="./Page.html" className="id-page">
                                    <img src={postUser?.avatar} alt="user picture" />
                                    <p>{postUser?.username}</p></a>
                                <button className="follow-btn-from-post following">
                                    Following
                                </button>
                            </div>
                        </div>
                        <div className="text-caption">
                            <p>{post?.description}</p>
                            <p className="time-reels">{post?.created_time}</p>
                        </div>
                        <ul className="list-comments">

                            {comments ? comments.map(comment => <Comment key={comment.id} content={comment.content} userId={comment.userId} time={comment.created_time} />) : <span></span>}

                        </ul>
                        <div className="send-comment-container">
                            <textarea type="text" className="input-comment" placeholder="Write a Comment"></textarea>
                            <button className="send-comment">
                                <img src={'./icons/add-instagram-reel.png'} alt="icon send message" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
