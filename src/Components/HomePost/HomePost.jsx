import { useEffect, useState } from "react"
import { getReq, postReq } from "../../lib/request"
export default function HomePost({ post }) {
    const [postUser, setPostUser] = useState(null)
    useEffect(() => {
        getReq(`/users?id=${post.userId}`)
            .then(user => {
                setPostUser(user[0])
            })
    }, [])
    return (
        <figure className="post-user">
            <header className="header-post">
                <a href="./Page.html"
                ><img src={postUser?.avatar} alt="picture of users"
                    /></a>
                <div className="post-details">
                    <a href="./Page.html" className="user-name-id">{postUser?.username}</a>

                    <span className="location"><ion-icon name="location-outline"></ion-icon><span> Germany</span></span>
                </div>
            </header>
            <img src={post.image} alt="photo from users" className="image-post" />
            <div className="action-btn-post">
                <button ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 btn btn-like">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                </button>
                <button><ion-icon name="chatbox-outline" class="btn"></ion-icon></button>
                <button ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 btn btn-bookmark">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                </button>
            </div>
            <figcaption className="caption-post">
                <p className="like-number">78 Likes</p>
                <div className="top-comments">
                    <p><span>Loki</span>🔥🔥</p>
                    <p><span>Salar</span>Awsome food picture!</p>
                </div>
                <p className="date-post">Sep of 2023</p>
            </figcaption>
        </figure>
    )
}
