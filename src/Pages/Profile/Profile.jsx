import React, { useEffect, useState } from 'react'
import { useAuthState } from '../../Context/auth-context'
import '../../css/style/profile.css'
import Layout from '../../Components/Layout'
import { getReq } from '../../lib/request'
export default function Profile() {
  const { user } = useAuthState()
  const [userPosts, setUserPosts] = useState([])
  useEffect(()=>{
    getReq(`/posts?userId=${user.id}`).then(posts => setUserPosts(posts)).catch()
  }, [])
  return (
    <Layout>
      <section className="profile-section container">
        <div className="top-profile-section">
          <img src={(user?.avatar)?user.avatar:'https://studycrafter.com/wp-content/uploads/2017/12/IAFOR-Blank-Avatar-Image-1.jpg'} alt='something went wrong!' />
          <div className="detail-profile">
            <div className="flex-section">
              <p className="user-id">{user.username}</p>
              <div className="icons">
                <a href="./SavePost.html" className="bookmark-icon" aria-label="Tooltip Top" tooltip-position="top"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 bookmark tooltips">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                </a>
                <a href="./Setting.html">
                  <ion-icon name="settings-outline" class="setting-icon"></ion-icon>
                </a>
              </div>
            </div>

            <div className="post-follower-section">
              <p><span>100</span>post's</p>
              <p><span>192k</span>followers</p>
              <p><span>194</span>following</p>
            </div>
            <p className="bio-user">{user.bio}</p>
          </div>
        </div>
        <div className="post-profile-section">
          <div className="list-post">
            {userPosts.map(post => <a href="./Comment.html" className="post"><img src={post.image} alt="post of user" /></a>)}
            
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
