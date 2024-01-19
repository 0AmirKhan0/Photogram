import { useEffect, useLayoutEffect, useState } from "react"
import '../../css/style/sign.css'
import { useAuthDispatch, useAuthState } from "../../Context/auth-context"
import { actionTypes } from "../../Context/reducer"
import { getReq, postReq } from "../../lib/request"
import { faker } from "@faker-js/faker"


const fetchUserData = async (username) => {
    return getReq(`/users?username=${username}`).then(users => users[0]).catch()
}
const saveLocalUser = (username) => {
    localStorage.setItem('username', username)
}
export default function Login() {
    const MODES = { signin: 'signin', singup: 'signup' }
    const [mode, setMode] = useState(MODES.signin)
    const [singupForm, setSignupForm] = useState({})
    const [singinForm, setSigninForm] = useState({})
    const { loading, error } = useAuthState()
    const authDispatch = useAuthDispatch()

    const handleUsernameForm = (e) => {
        if (mode === MODES.singup) {
            setSignupForm((state) => {
                return { ...state, username: e.target.value }
            })
        } else {
            setSigninForm((state) => {
                return { ...state, username: e.target.value }
            })
        }
    }
    const handlePasswordForm = (e) => {
        if (mode === MODES.singup) {
            setSignupForm((state) => {
                return { ...state, password: e.target.value }
            })
        } else {
            setSigninForm((state) => {
                return { ...state, password: e.target.value }
            })
        }
    }
    const handleMode = (mode) => {
        if (mode === MODES.singup) {
            setMode(MODES.singup)
        }
        else setMode(MODES.signin)
    }

    const handleSignin = (e) => {
        e.preventDefault()
        fetchUserData(singinForm.username)
            .then(tempUser => {
                if (tempUser) {
                    // console.log(singinForm.password);
                    if (tempUser.password === singinForm.password) {
                        saveLocalUser(tempUser.username)
                        authDispatch({
                            type: actionTypes.LOGIN_SUCCESS,
                            payload: { user: tempUser }
                        })
                        // console.log(user)
                    } else {
                        authDispatch({
                            type: actionTypes.LOGIN_ERROR,
                            payload: { error: 'Password is incorrect' }
                        })
                        // console.log('ok3');
                    }
                } else {
                    authDispatch({
                        type: actionTypes.LOGIN_ERROR,
                        payload: { error: 'Username does not exist' }
                    })
                    // console.log('ok4');
                }
            })
            .catch()

    }
    const handleSignup = (e) => {
        e.preventDefault()
        const tempUser = fetchUserData(singupForm.username).then(user => user).catch()
        if (tempUser) {
            authDispatch({
                type: actionTypes.SIGNUP_ERROR,
                payload: { error: 'This username already exists' }
            })
        } else {
            const newUser = { id: faker.string.uuid(), username: singupForm.username, bio: '', avatar: '' }
            postReq('/users', newUser)
                .then(() => {
                    saveLocalUser(newUser)
                    authDispatch({
                        type: actionTypes.SIGNUP_SUCCESS,
                        payload: { user: newUser }
                    })
                }).catch()
        }
    }
    useLayoutEffect(() => {
        const username = localStorage.getItem('username')
        authDispatch({
            type: actionTypes.LOGIN_REQUEST
        })
        fetchUserData(username).then(tempUser => {
            if (tempUser) {
                saveLocalUser(tempUser.username)
                authDispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: { user: tempUser }
                })
            } else {
                authDispatch({
                    type: actionTypes.LOGOUT
                })
            }
        }).catch(error => {
            authDispatch({
                type: actionTypes.LOGOUT
            })
        })
    }, [])

    // useEffect(() => {
    //     // console.log(user?.username);
    //     const saveUser = async(user)=>{
    //         localStorage.setItem('username', user.username)
    //         console.log('ok')
    //     }
    //     if (user){
    //         saveUser(user)
    //     }
    //     return (() => {
    //         console.log("close!");
    //         localStorage.setItem('username', user?.username)
    //     })
    // }, [user, authDispatch])

    return (
        <>
            {(loading) ? 'loading' :
                <div className={`container-sign ${(mode === MODES.singup) ? 'active' : ''}`} id="login-container">
                    <div className="form-container sign-up">
                        <form>
                            <h1>Create Account</h1>
                            {/* <span>or use your email for registeration</span> */}
                            <input onChange={handleUsernameForm} type="text" placeholder="Username" />
                            <input onChange={handlePasswordForm} type="password" placeholder="Password" />
                            <button onClick={handleSignup}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form>
                            <h1>Sign In</h1>
                            {/* <span>or use your email password</span> */}
                            <input onChange={handleUsernameForm} type="text" placeholder="Username" />
                            <input onChange={handlePasswordForm} type="password" placeholder="Password" />
                            {/* <a href="#">Forget Your Password?</a> */}
                            <button onClick={handleSignin}>Sign In</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>

                                <button onClick={(e) => handleMode(MODES.signin)} className="hidden" id="login">Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <button onClick={(e) => handleMode(MODES.singup)} className="hidden" id="register">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
