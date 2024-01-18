import "../../css/style/home.css"
import HomePost from "../../Components/HomePost"
import HomeStory from "../../Components/HomeStory"
import Layout from "../../Components/Layout"
import { useEffect } from "react"
import { useState } from "react"
import { postReq, getReq } from "../../lib/request"
export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getReq("/posts")
        .then(posts => {
            setPosts(posts)
        })
    }, [])
    return (
        <>
            <Layout>
                <main className="container">
                    <div className="main-story">
                        <ul className="story">
                            <HomeStory />
                        </ul>
                    </div>
                    <section className="post-section">
                        {(posts.length)?posts.map(post => <HomePost key={post.id}  post={post} />):'loading'}
                    </section>
                </main>
            </Layout>
        </>
    )
}
