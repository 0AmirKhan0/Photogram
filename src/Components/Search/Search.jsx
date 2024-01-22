import React, { useEffect, useState } from 'react'
import { getReq } from '../../lib/request'
import { Link } from 'react-router-dom'
export default function Search() {
    const [search, setSearch] = useState(null)
    const [users, setUsers] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        document.body.addEventListener("click", handleWindowClick)
        return () => document.body.removeEventListener('click', handleWindowClick)
    }, [])
    const handleWindowClick = (e) => {
        if (!e.target.classList.contains("search-explore")) {
            setIsOpen(false)
        }
    }
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
        getReq(`/users?username_startsWith=${search}`).then(users => setUsers(users))
    }
    return (
        <div className="header-explore dropdown">
            <input type="text" onClick={handleOpen} onChange={handleChange} placeholder="Search" className="search-explore" />
            {/* <div className={`dropdown-content ${isOpen && "block"}`}> */}
            {isOpen &&
                <div className="dropdown-content">
                    {(users) ? users.map(user =>
                        <div className="user-page">
                            <Link to={`/user/${user?.id}`}>
                                <img
                                    src={user?.avatar}
                                    alt="user"
                                />
                                <p>{user.username}</p>
                            </Link>
                        </div>
                    ) : null}

                </div>}
        </div>
    )
}
