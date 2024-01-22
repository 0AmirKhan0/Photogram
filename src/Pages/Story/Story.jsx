import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getReq } from '../../lib/request'
import '../../css/style/story.css'
export default function Story() {
    const { id } = useParams()
    const [story, setStory] = useState(null)
    const [user, setUser] = useState(null)
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        getReq(`/stories/${id}`).then(story => setStory(story)).catch()
    }, [])
    useEffect(() => {
        if (story) {
            getReq(`/users/${story.userId}`).then(user => setUser(user)).catch()
        }
    }, [story])
    const handleClose = (e) => {
        navigate(-1)
    }
    const handleUserButton = (e) => {
        e.preventDefault()
        e.stopPropagation()
        navigate(`/user/${user?.id}`)
    }
    useEffect(() => {
        const iv = setInterval(() => {
            setProgress(state => {
                if(state < 400) return state+1
                else navigate('/') 
                return state+1
            })
        }, 15);
        return () => clearInterval(iv)
    }, [])
    return (
        <section class="story-section">
            <div class="overlay-story" onClick={handleClose}>
                <div class="story-container">
                    <img src={story?.image} alt="story image" />
                    <a onClick={handleUserButton} to={`/user/${user?.id}`} class="information-page">
                        <img src={user?.avatar} alt="profile of user" />
                        <p>{user?.username}</p>
                    </a>
                </div>
                <progress id="progress" value={progress} max="400"></progress>
            </div>
        </section>
    )
}
