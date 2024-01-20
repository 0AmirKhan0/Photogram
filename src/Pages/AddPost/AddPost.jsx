import React, { useState } from 'react'
import '../../css/style/add-post.css'
import Layout from '../../Components/Layout'
import { postReq } from '../../lib/request'
import { postGenerator, storyGenerator } from '../../lib/faker'
import { useAuthState } from '../../Context/auth-context'
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
export default function AddPost() {
    const { user } = useAuthState()
    const [story, setStory] = useState(null)
    const [post, setPost] = useState(null)
    const handleStory = (e) => {
        // toBase64(e.target.files[0]).then(data => setStory(data)).catch();
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
        // toBase64(e.target.files[0]).then(data => setPost(state => {
        //     return { ...state, image: data }
        // })).catch();
        const temppath = URL.createObjectURL(e.target.files[0]);
        setPost(state => {
            return {...state, image:temppath}
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
                    <img src={(post?.image)?post.image:'./icons/add-instagram-reel.png'} alt="icon for add post" id="addPostSrc" className={post?.image && 'fill'} />
                    <input onChange={handlePostImage} type="file" id="postFile" className="file" />
                    <label htmlFor="postFile">
                        Select file
                        <p className="file-name"></p>
                    </label>
                    <button onClick={addPost} className="add-post-btn btn">Add Post</button>
                    <textarea onChange={handlePostdescription} cols="30" rows="10" className="discription-add-post" placeholder="Write description for post"></textarea>
                </div>
                <div className="file-input">

                    <img src={(story) ? story : "./icons/add-instagram-story.png"} alt="icon for add story" id="addStorySrc" className={story && 'fill'} />
                    <input onChange={handleStory} type="file" id="storyFile" className="file" />
                    <label htmlFor="storyFile">
                        Select file
                        <p className="file-name"></p>
                    </label>
                    <button onClick={addStory} className="post-story btn">Add Story</button>
                </div>
            </section>
        </Layout>
        // <script>
        // const storyDefaultImg = document.getElementById('addStorySrc')
        // const storyInput = document.getElementById('storyFile');
        // const toBase64 = file => new Promise((resolve, reject) => {
        //    const reader = new FileReader();
        //    reader.readAsDataURL(file);
        //    reader.onload = () => resolve(reader.result);
        //    reader.onerror = error => reject(error);
        // });
        // const inputFiles = async (files) => {
        //   //  storyInput.files = files;
        //   storyDefaultImg.classNameList.add('fill');
        //   storyDefaultImg.src = await toBase64(files[0]);
        // }
        // storyInput.onchange = () => {
        //    inputFiles(storyInput.files);
        // }
        // </script>
    )
}
