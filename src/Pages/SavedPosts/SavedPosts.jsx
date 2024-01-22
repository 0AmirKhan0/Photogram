import React, { useEffect, useState } from 'react'
import '../../css/style/save-post.css'
import Layout from '../../Components/Layout'
import { getReq } from '../../lib/request'
import { useAuthState } from '../../Context/auth-context'
import { Link } from 'react-router-dom'
export default function SavedPosts() {
    const [posts, setPosts] = useState([])
    const {user} = useAuthState(null)
    useEffect(() => {
        getReq(`/savedPosts?userId=${user.id}`).then(savedPosts => {
            savedPosts.forEach(savedPost => {
                getReq(`/posts?id=${savedPost.postId}`).then(posts => setPosts(state => [posts[0], ...state])).catch()
            })
        }).catch()
    }, [])
    return (
        <Layout>
            <section class="save-section container grid--3--cols">
                {(posts) ?
                    posts.map(post => <Link to={`/post/${post.id}`} class="save-post"><img src={post.image} alt="picture" /></Link>) 
                    : <span>There are no saved posts</span>
                }
            </section>
        </Layout>
    )
}
