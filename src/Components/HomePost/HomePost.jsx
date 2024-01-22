import { useEffect, useState } from "react"
import { deleteReq, getReq, postReq } from "../../lib/request"
import { Link } from "react-router-dom"
import { useAuthState } from "../../Context/auth-context"
import { likeGenerator, savedPostGenerator } from "../../lib/faker"
export default function HomePost({ post }) {
    const [postUser, setPostUser] = useState(null)
    const { user } = useAuthState()
    const [like, setLike] = useState(null)
    const [likesCount, setLikesCount] = useState(0)
    const [comments, setComments] = useState([])
    const [saved, setSaved] = useState(null)
    useEffect(() => {
        getReq(`/users?id=${post.userId}`)
            .then(users => {
                setPostUser(users[0])
            }).catch()
        getReq(`/savedPosts?userId=${user.id}&postId=${post.id}`).then(savedPosts => setSaved(savedPosts?savedPosts:null)).catch()
        getReq(`/comments?postId=${post.id}&_limit=3`).then(comments => setComments(comments)).catch()
    }, [])
    useEffect(() => {
        getReq(`/likes?postId=${post.id}&userId=${user.id}`).then(likes => {
            if (likes.length > 0) {
                setLike(likes[0])
                setLikesCount(likes.length)
            } else {
                setLike(null)
                setLikesCount(0)
            }
        }).catch()
    }, [])
    const handleLike = () => {
        if (!like) {
            const tempLike = likeGenerator(user.id, post.id)
            setLike(tempLike)
            setLikesCount(count => count + 1)
        } else {
            deleteReq(`/likes/${like.id}`)
            setLike(null)
            setLikesCount(count => count - 1)
        }
    }
    const handleSave = () => {
        if (!saved) {
            const tempSave = savedPostGenerator(user.id, post.id)
            setSaved(tempSave)
        } else {
            deleteReq(`/savedPosts/${saved.id}`)
            setSaved(null)
        }
    }
    return (
        <figure className="post-user">
            <header className="header-post">
                <Link to={`/user/${postUser?.id}`}
                ><img src={postUser?.avatar} alt="user"
                    /></Link>
                <div className="post-details">
                    <Link to={`/user/${postUser?.id}`} className="user-name-id">{postUser?.username}</Link>

                    <span className="location"><ion-icon name="location-outline"></ion-icon><span> Germany</span></span>
                </div>
            </header>
            <img src={post.image} alt="photo from users" className="image-post" />
            <div className="action-btn-post">
                <button onClick={handleLike} ><svg xmlns="http://www.w3.org/2000/svg" stroke={(like) ? "crimson" : "black"} fill={(like) ? "crimson" : "white"} viewBox="0 0 24 24" stroke-width="1.5" className="w-6 h-6 btn btn-like">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                </button>
                <Link to={`/post/${post?.id}`}>
                    <button><ion-icon name="chatbox-outline" class="btn"></ion-icon></button>
                </Link>
                <button onClick={handleSave}><svg xmlns="http://www.w3.org/2000/svg" fill={saved?"black":"none"} stroke="black" viewBox="0 0 24 24" stroke-width="1.5" className="w-6 h-6 btn btn-bookmark">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                </button>
            </div>
            <figcaption className="caption-post">
                <p className="like-number">{likesCount} Likes</p>

                <div className="top-comments">
                    {comments &&
                        comments.map(comment => <p><span>- </span>{comment.content}</p>)
                    }
                </div>
                <p className="date-post">{post.created_time}</p>
            </figcaption>
        </figure>
    )
}
