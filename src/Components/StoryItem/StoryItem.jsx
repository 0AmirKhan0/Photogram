import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getReq } from '../../lib/request'
import { Link } from 'react-router-dom'

export default function StoryItem({ story }) {
    const [seen, setSeen] = useState(false)
    const [storyUser, setStoryUser] = useState(null)
    const handleSeen = () => {
        setSeen(true)
    }
    useLayoutEffect(() => {
        getReq(`/users?id=${story.userId}`).then(users => setStoryUser(users[0])).catch()
    }, [])
    return (
        <Link to={`/story/${story?.id}`} className={`story-user ${seen ? "seen-story" : ''}`}>
            <img onClick={handleSeen} src={storyUser?.avatar} alt="story" />
            <p>{storyUser?.username}</p>
        </Link>
    )
}
