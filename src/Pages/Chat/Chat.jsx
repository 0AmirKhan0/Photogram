import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../../css/style/chat.css'
import { Link, useParams } from 'react-router-dom'
import { getReq } from '../../lib/request'
import { useAuthState } from '../../Context/auth-context'
import { messageGenerator } from '../../lib/faker'
import Layout from '../../Components/Layout'
export default function Chat() {
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState()
    const { id } = useParams()
    const { user } = useAuthState()
    const [secondUser, setSecondUser] = useState(null)
    const [messageInput, setMessageInput] = useState('')
    const scroller = useRef()
    useLayoutEffect(() => {
        getReq(`/chats?id=${id}`).then(chats => setChat(chats[0])).catch()
    }, [])
    useEffect(() => {
        if (chat) {
            getReq(`/messages?chatId=${chat.id}&_sort=created_time&_order=asc`).then(messages => setMessages(messages)).catch()
        }
        if (chat?.user1Id === user.id) {
            getReq(`/users?id=${chat.user2Id}`).then(users => setSecondUser(users[0])).catch()
        } else {
            getReq(`/users?id=${chat?.user1Id}`).then(users => setSecondUser(users[0])).catch()
        }
    }, [chat])
    useEffect(() => {
        scroller.current.scrollTop = scroller.current.scrollHeight;
    })
    const handleChange = (e) => {
        setMessageInput(e.target.value)
    }
    const sendMessage = () => {
        if (messageInput) {
            const msg = messageGenerator(chat.id, user.id, messageInput)
            setMessages(state => [...state, msg])
            setMessageInput('')
            console.log(messages);
        }
    }
    return (
        <Layout>
            <section className="container chat-section">
                <header className="header-chat">
                    <Link to="/message" className="back-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </Link>
                    <img src={secondUser?.avatar} alt="profile user" />
                    <Link to={`/user/${secondUser?.id}`}>
                        <p className="user-id">{secondUser?.username}</p>
                    </Link>
                </header>

                <ul className="chat-part" ref={scroller}>
                    {messages ?
                        messages.map((message, index) => {
                            if (message?.senderId === user.id) {
                                return (
                                    <li className={"friend-user"}>
                                        <p>{message.content}</p>
                                        {/* <img src={user?.avatar} alt={user.username} /> */}
                                    </li>
                                )
                            } else {
                                return (
                                    <li>
                                        {(messages[index + 1]?.senderId === secondUser?.id) ? <p className='fix-message-padding'>{message.content}</p> :
                                            <>
                                                <Link to={`/user/${secondUser?.id}`}><img src={secondUser?.avatar} alt={secondUser?.username} /></Link>
                                                <p>{message.content}</p>
                                            </>
                                        }

                                    </li>
                                )
                            }
                        })
                        :
                        <span>History in empty</span>
                    }
                </ul>
                <div className="send-message-container">
                    <textarea onChange={handleChange} type="text" className="input-chat" placeholder="Write a Message" value={messageInput}>{messageInput}</textarea>
                    <button className="send-message" onClick={sendMessage}>
                        <svg classNameName='send-comment-icon' fill='#118aff' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 20 10-20 10zm0 8v4l10-2z" /></svg>
                    </button>
                </div>
            </section>
        </Layout>
    )
}
