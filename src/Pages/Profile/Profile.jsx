import React, { useEffect, useState } from 'react'
import { useAuthState } from '../../Context/auth-context'
import '../../css/style/profile.css'
import Layout from '../../Components/Layout'
import { getReq } from '../../lib/request'
import { Link } from 'react-router-dom'
export default function Profile() {
  const { user } = useAuthState()
  const [userPosts, setUserPosts] = useState([])
  const [followingsCount, setFollowingsCount] = useState(null)
  const [followersCount, setFollowersCount] = useState(null)
  useEffect(() => {
    getReq(`/posts?userId=${user.id}`).then(posts => setUserPosts(posts)).catch()
    getReq(`/follows?followerId=${user.id}`).then(followings => setFollowingsCount(followings.length))
    getReq(`/follows?followingId=${user.id}`).then(followers => setFollowersCount(followers.length))
  }, [])
  return (
    <Layout>
      <section className="profile-section container">
        <div className="top-profile-section">
          <img src={(user?.avatar) ? user.avatar : 'https://studycrafter.com/wp-content/uploads/2017/12/IAFOR-Blank-Avatar-Image-1.jpg'} alt='something went wrong!' />
          <div className="detail-profile">
            <div className="flex-section">
              <p className="user-id">{user.username}</p>
              <div className="icons">
                <Link to="/saved-posts" className="bookmark-icon" aria-label="Tooltip Top" tooltip-position="top"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 bookmark tooltips">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                </Link>
                <Link to="/setting">
                  <ion-icon name="settings-outline" class="setting-icon"></ion-icon>
                </Link>
              </div>
            </div>
            <div className="post-follower-section">
              <p><span>{userPosts && userPosts.length}</span>post's</p>
              <p><span>{followersCount}</span>followers</p>
              <p><span>{followingsCount}</span>following</p>
            </div>
            <p className="bio-user">{user.bio}</p>
          </div>
        </div>
        <div className="post-profile-section">
          <div className="list-post">
            {userPosts.map(post => <Link to={`/post/${post.id}`} className="post"><img src={post.image} alt="post of user" /></Link>)}

            {/* <a href="./Comment.html" className="post"><img src="../img/post/post-2.jpg" alt="post of user" /></a>
            <a href="./Comment.html" className="post"><img src="../img/post/post-3.jpg" alt="post of user" /></a>
            <a href="./Comment.html" className="post"><img src="../img/post/post-4.jpg" alt="post of user" /></a>
            <a href="./Comment.html" className="post"><img src="../img/post/post-15.jpg" alt="post of user" /></a> */}
          </div>
        </div>
      </section>
    </Layout>
  )
}
