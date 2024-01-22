import React, { useEffect, useState } from 'react'
import '../../css/style/comment.css'
import { deleteReq, getReq } from '../../lib/request'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from '../../Components/Comment'
import { commentGenerator, followGenerator } from '../../lib/faker'
import { useAuthState } from '../../Context/auth-context'
import { Link } from 'react-router-dom'
const fetchPost = async (id) => {
  return getReq(`/posts?id=${id}`).then(posts => posts[0]).catch()
}
const fetchPostUser = async (id) => {
  return getReq(`/users?id=${id}`).then(users => users[0]).catch()
}
const fetchComments = async (id) => {
  return getReq(`/comments?postId=${id}`).then(posts => posts).catch()
}
export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [postUser, setPostUser] = useState(null)
  const [comments, setComments] = useState([])
  const [commentInput, setCommentInput] = useState('')
  const { user } = useAuthState()
  const [follow, setFollow] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (postUser) {
      getReq(`/follows?followerId=${user.id}&follwingId=${postUser.id}`).then(follows => {
        if (follows.length > 0) {
          setFollow(follows[0])
        }
      })
    }
  }, [postUser])
  const handleFollow = () => {
    if (follow) {
      deleteReq(`/follows/${follow.id}`)
      setFollow(null)
    } else {
      const tempFollow = followGenerator(user.id, postUser.id)
      setFollow(tempFollow)
    }
  }
  const handleCommentInpput = (e) => {
    setCommentInput(e.target.value)
  }
  useEffect(() => {
    fetchPost(id).then(post => setPost(post)).catch()
  }, [])
  useEffect(() => {
    fetchPostUser(post?.userId).then(user => setPostUser(user)).catch()
    fetchComments(id).then(comments => setComments(comments)).catch()
  }, [post])

  const sendComment = () => {
    const newComment = commentGenerator(user.id, post.id, commentInput)
    setCommentInput('')
    setComments(state => [newComment, ...state])
  }
  const handleClose = () => {
    navigate(-1)
  }
  return (
    <section className="comment-section">
      <button onClick={handleClose} className='closeBtn'>
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"><path d="m368 368-224-224" /><path d="m368 144-224 224" /></g></svg>
      </button>
      <div className="overly-background" >
        <div className="comments-panel">
          <div className="post-image">
            <img src={post?.image} alt="post from user" />
          </div>
          <div className='post-information-wrapper'>
            <div className="detail-post">
              <div className="information-post">
                <div className="information-page">
                  <Link to={`/user/${postUser?.id}`} className="id-page">
                    <img src={postUser?.avatar} alt="user picture" />
                    <p>{postUser?.username}</p></Link>
                  {/* <button className="follow-btn-from-post following"> */}
                  {(postUser?.id === user.id) ? '' :
                    <button onClick={handleFollow} className={`follow-btn-from-post ${follow ? 'following' : ''}`}>
                      {(follow) ? "Following" : "Follow"}
                    </button>
                  }
                </div>
              </div>
              <div className="text-caption">
                <p>{post?.description}</p>
                <p className="time-reels">{post?.created_time}</p>
              </div>
              <ul className="list-comments">
                {comments ? comments.map(comment => <Comment key={comment.id} content={comment.content} userId={comment.userId} time={comment.created_time} />) : <span></span>}
              </ul>
            </div>
            <div className="send-comment-container">
              <textarea onChange={handleCommentInpput} type="text" className="input-comment" placeholder="Write a Comment" value={commentInput}>{commentInput}</textarea>
              <button className="send-comment" onClick={sendComment}>
                {/* <img src={'./icons/add-instagram-reel.png'} alt="icon send message" /> */}
                <svg className='send-comment-icon' fill='#217aff' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 20 10-20 10zm0 8v4l10-2z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
