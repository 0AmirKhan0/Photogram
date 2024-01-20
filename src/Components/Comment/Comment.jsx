import React, { useEffect, useState } from 'react'
import { getReq } from '../../lib/request'


const fetchUser = async (id) => {
    return getReq(`/users?id=${id}`).then(users => users[0]).catch()
}
export default function Comment({ key, content, userId, time }) {
    const [user, settUser] = useState(null)
    useEffect(() => {
        fetchUser(userId).then(user => settUser(user)).catch()
    }, [])
    return (
        <li className="comment-part">
            <div className="user-page">
                <a href="./Page.html">
                    <img src={user?.avatar} alt="picture of user"/>
                    <p>{user?.username}</p>
                </a>
            </div>
            <p>{content} <span>{time}</span></p>
        </li>
    )
}
