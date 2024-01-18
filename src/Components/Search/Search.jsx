import React, { useState } from 'react'
import { getReq } from '../../lib/request'
export default function Search() {
    const [search, setSearch] = useState(null)
    const [users, setUsers] = useState([])
    const handleChange = (e) => {
        setSearch(e.target.value)
        getReq(`/users?username_startsWith=${search}`).then(users => setUsers(users))
    }
    return (
        <div className="header-explore dropdown">
            <input type="text" onChange={handleChange} placeholder="Search" className="search-explore" />
            <div className="dropdown-content">
                {(users) ? users.map(user =>
                    <div className="user-page">
                        <a href="./Page.html">
                            <img
                                src={user.avatar}
                                alt="picture of user"
                            />
                            <p>{user.username}</p>
                        </a>
                    </div>
                ) : null}

            </div>
        </div>
    )
}
