import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import "../../css/style/explore.css"
import { getReq } from '../../lib/request'
import Search from '../../Components/Search'
import { Link } from 'react-router-dom'
export default function Explore() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getReq("/posts").then(posts => setPosts(posts))
    }, [])
    return (
        <>
            <Layout>
                <section className="container">
                    <Search />
                    <div className="explore-section">
                        {/* <a href="./Comment.html" className="post-explore span-element"><img src="../img/post/post-9.jpg" alt="explore image"/></a> */}
                        {/* <a href="./Comment.html" className="post-explore"><img src="../img/post/post-8.jpg" alt="explore image"/></a> */}
                        {(posts)?posts.map((post, index) => <Link key={post.id} to={`/post/${post.id}`} className={`post-explore ${(index%16==0)?"span-element":""}`}><img src={post.image} alt="explore image"/></Link>):"loading"}
                    </div>
                </section>
            </Layout>
        </>
    )
}
