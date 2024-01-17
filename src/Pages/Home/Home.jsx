import "../../css/style/home.css"
import HomePost from "../../Components/HomePost"
import HomeStory from "../../Components/HomeStory"
import Layout from "../../Components/Layout"
import { useEffect } from "react"
import { useState } from "react"
import { get } from "../../lib/request"
export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        get("/posts")
        .then(posts => setPosts(posts))
    }, [])
    const postsRender = posts.map(post => <HomePost />
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
                        <HomePost />
                    </section>
                </main>
            </Layout>
        </>
    )
}
