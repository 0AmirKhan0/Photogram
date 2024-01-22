import "../../css/style/home.css"
import HomePost from "../../Components/HomePost"
import HomeStory from "../../Components/HomeStory"
import Layout from "../../Components/Layout"
import { useEffect } from "react"
import { useState } from "react"
import { postReq, getReq } from "../../lib/request"
export default function Home() {
    const [posts, setPosts] = useState([])
    // const [stories, setStories] = useState([])
    useEffect(() => {
        getReq("/posts")
            .then(posts => {
                setPosts(posts)
            })
        // getReq("/stories").then(stories => setStories(stories)).catch()
    }, [])
    // const ele = document.getElementById('story-container');
    // let pos = {left: 0, x: 0};
    // const mouseDownHandler = function (e) {
    //     ele.style.userSelect = 'none';
    //     pos = {
    //         left: ele.scrollLeft,
    //         x: e.clientX,
    //     };
    //     document.addEventListener('mousemove', mouseMoveHandler);
    //     document.addEventListener('mouseup', mouseUpHandler);
    // };
    // const mouseMoveHandler = function (e) {
    //     const dx = e.clientX - pos.x;
    //     ele.scrollLeft = pos.left - dx;
    // };
    // const mouseUpHandler = function () {
    //     ele.style.removeProperty('user-select');
    //     document.removeEventListener('mousemove', mouseMoveHandler);
    //     document.removeEventListener('mouseup', mouseUpHandler);
    // };
    return (
        <>
            <Layout>
                <main className="container">
                    <HomeStory />
                    {/* <div className="main-story" onMouseDown={mouseDownHandler}> */}
                    {/* {stories && stories.map(story => <HomeStory story={story} />)} */}
                    {/* <ul className="story" id="story-container">
                        </ul> */}
                    {/* </div> */}
                    <section className="post-section">
                        {(posts.length) ? posts.map(post => <HomePost key={post.id} post={post} />) : 'loading'}
                    </section>
                </main>
            </Layout>
        </>
    )
}
