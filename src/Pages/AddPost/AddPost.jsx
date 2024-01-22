import React, { useState } from 'react'
import '../../css/style/add-post.css'
import Layout from '../../Components/Layout'
import { postReq } from '../../lib/request'
import { postGenerator, storyGenerator } from '../../lib/faker'
import { useAuthState } from '../../Context/auth-context'

export default function AddPost() {
    const { user } = useAuthState()
    const [story, setStory] = useState(null)
    const [post, setPost] = useState(null)
    const handleStory = (e) => {
        const temppath = URL.createObjectURL(e.target.files[0]);
        setStory(temppath)
    }
    const addStory = (e) => {
        e.preventDefault()
        if (story) {
            storyGenerator(user.id, story)
        }
    }
    const handlePostImage = (e) => {
        const temppath = URL.createObjectURL(e.target.files[0]);
        setPost(state => {
            return { ...state, image: temppath }
        })

    }
    const handlePostdescription = (e) => {
        setPost(state => {
            return { ...state, description: e.target.value }
        })
    }
    const addPost = (e) => {
        e.preventDefault()
        if (post) {
            postGenerator(user.id, post)
        }
    }
    return (
        <Layout>
            <section className="add-post-section">
                <div className="file-input">
                    <img src={(post?.image) ? post.image : './icons/add-instagram-reel.png'} alt="icon for add post" id="addPostSrc" className={post?.image && 'fill'} />
                    <input onChange={handlePostImage} type="file" id="postFile" className="file" accept="image/*" />
                    <label htmlFor="postFile">
                        Select file
                        <p className="file-name"></p>
                    </label>
                    <button onClick={addPost} className="add-post-btn btn">Add Post</button>
                    <textarea onChange={handlePostdescription} cols="30" rows="10" className="discription-add-post" placeholder="Write description for post"></textarea>
                </div>
                <div className="file-input">

                    <img src={(story) ? story : "./icons/add-instagram-story.png"} alt="icon for add story" id="addStorySrc" className={story && 'fill'} />
                    <input onChange={handleStory} type="file" id="storyFile" className="file" accept="image/*" />
                    <label htmlFor="storyFile">
                        Select file
                        <p className="file-name"></p>
                    </label>
                        <button onClick={addStory} className="post-story btn">Add Story</button>
                </div>
            </section>
        </Layout>
    )
}
