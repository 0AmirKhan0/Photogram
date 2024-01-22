import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import '../../css/style/message.css'
import { getReq, postReq } from '../../lib/request'
import { useAuthState } from '../../Context/auth-context'
import ChatItem from '../../Components/ChatItem'
import { Link } from 'react-router-dom'
const fetchUserData = async (userId) => {
    return getReq(`/users?id=${userId}`).then(users => users[0]).catch()
}
export default function Message() {
    const { user } = useAuthState()
    const [chats, setChats] = useState([])
    useEffect(() => {
        getReq(`/chats?user1Id=${user.id}`).then(chats => setChats((state) => {
            return [...state, ...chats]
        })).catch()
        getReq(`/chats?user2Id=${user.id}`).then(chats => setChats((state) => {
            return [...state, ...chats]
        })).catch()
        console.log(chats);
    }, [])
    return (
        <Layout>
            <section className="message-section">
                <div className="container list-contanct">
                    {(chats)? chats.map(chat =><Link to={`/chat/${chat.id}`}><ChatItem key={chat.id} chatId={chat.id} user1Id={chat.user1Id} user2Id={chat.user2Id} /></Link>) : ''}
                </div>
            </section>
        </Layout>
    )
}
