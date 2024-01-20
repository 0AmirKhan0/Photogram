import React, { useEffect, useState } from 'react'
import { useAuthState } from '../../Context/auth-context'
import { getReq } from '../../lib/request'


const fetchUserData = async (id) => {
    return getReq(`/users?id=${id}`).then(users => users[0]).catch()
}
export default function ChatItem({chatId, user1Id, user2Id}) {
    const [last, setLast] = useState()
    const { user } = useAuthState()
    // const [image, setImage] = useState()
    const [secondUser, setSecondUser] = useState(null)
    useEffect(() => {
        getReq(`/messages?chatId=${chatId}&_sort=created_time&_order=desc`).then(messages => setLast(messages[0])).catch()
    }, [])
    useEffect(() => {
        if (user.id === user1Id) {
            fetchUserData(user2Id).then(user2 => {
                // setImage(user2.avatar)
                setSecondUser(user2)
            }).catch()
        } else {
            fetchUserData(user1Id).then(user1 => setSecondUser(user1)).catch()
        }
    }, [])
    return (
        <a href="./Chat.html" className="message-part">
            <img src={secondUser?.avatar} alt="user profile" />
            <div>
                <p className="message-user-id">{secondUser?.username}</p>
                <p className="top-message">{last?.content}</p>
            </div>
        </a>
    )
}
