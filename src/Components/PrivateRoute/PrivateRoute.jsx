import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useAuthState } from '../../Context/auth-context'
export default function PrivateRoute() {
    const { user } = useAuthState()
    const location = useLocation()
    return (
        <>
            {user ? <Outlet /> : <Navigate replace to={'/login'} state={{ from: location.pathname }}/>}
        </>
    )
}

