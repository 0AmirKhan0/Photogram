import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import '../../css/style/page.css'
import { useAuthState } from '../../Context/auth-context'
import { deleteReq, getReq, postReq } from '../../lib/request'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { chatGenerator, followGenerator } from '../../lib/faker'

export default function Page() {
    const [pageUser, setPageUser] = useState(null)
    const { user } = useAuthState()
    const [posts, setPosts] = useState([])
    const { id } = useParams()
    const [follow, setFollow] = useState(null)
    const [followersCount, setFollowersCount] = useState(0)
    const [followingsCount, setFollowingsCount] = useState(0)
    useEffect(() => {
        if (pageUser) {
            getReq(`/follows?followerId=${pageUser.id}`).then(followings => setFollowingsCount(followings.length))
            getReq(`/follows?followingId=${pageUser.id}`).then(followers => setFollowersCount(followers.length))
        }
    }, [pageUser])
    useEffect(() => {
        if (pageUser) {
            getReq(`/follows?followerId=${user.id}&followingId=${pageUser.id}`).then(follows => {
                if (follows.length > 0) {
                    setFollow(follows[0])
                }
            })
        }
    }, [pageUser])
    const handleFollow = () => {
        if (follow) {
            deleteReq(`/follows/${follow.id}`)
            setFollow(null)
            setFollowersCount(count => count - 1)
        } else {
            const tempFollow = followGenerator(user.id, pageUser.id)
            setFollow(tempFollow)
            setFollowersCount(count => count + 1)
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        getReq(`/users?id=${id}`).then(users => setPageUser(users[0])).catch()
    }, [])
    useEffect(() => {
        getReq(`/posts?userId=${id}`).then(posts => setPosts(posts)).catch()
    }, [pageUser])
    const handleMessage = (e) => {
        e.preventDefault()
        let chat = null
        getReq(`/chats?user1Id=${user.id}&user2Id=${pageUser.id}`).then(chats => {
            if (chats.length > 0) {
                chat = chats[0]
                navigate(`/chat/${chat?.id}`)
            } else {
                getReq(`/chats?user2Id=${user.id}&user1Id=${pageUser.id}`).then(chats => {
                    if (chats.length > 0) {
                        chat = chats[0]
                        navigate(`/chat/${chat?.id}`)
                    } else {
                        const { id } = chatGenerator(user.id, pageUser.id)
                        navigate(`/chat/${id}`)
                    }
                })
            }
        })
    }
    return (
        <Layout>
            <section className="profile-section container">
                <div className="top-profile-section">
                    <img src={pageUser?.avatar ? pageUser.avatar : ''} alt="profile of user" />
                    <div className="detail-profile">
                        <div className="flex-section">
                            <a href="#" className="user-id">{pageUser?.username}</a>
                            <div className="follow-message-btn">
                                {/* <button onClick={handleFollow} className="btn following">{(follow)?"Following":"Follow"}</button> */}
                                {(pageUser?.id === user?.id) ? '' :
                                    <>
                                        <button onClick={handleFollow} className={`btn ${follow ? 'following' : ''}`}>{(follow) ? "Following" : "Follow"}</button>
                                        <a onClick={handleMessage} href="#"><button className="btn-message">Message</button></a>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="post-follower-section">
                            <p><span>{posts && posts.length}</span>Post's</p>
                            <p><span>{followersCount}</span>Followers</p>
                            <p><span>{followingsCount}</span>Followings</p>
                        </div>
                        <p className="bio-user">{pageUser?.bio}</p>
                    </div>
                </div>
                <div className="post-profile-section">
                    <div className="list-post">
                        {posts && posts.map(post => <Link key={post.id} to={`/post/${post?.id}`} className="post"><img src={post?.image} alt="post of user" /></Link>)}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

