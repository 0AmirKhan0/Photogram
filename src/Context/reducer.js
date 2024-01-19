export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    SIGNUP_REQUEST: 'LOGIN_REQUEST',
    SIGNUP_SUCCESS: 'LOGIN_SUCCESS',
    SIGNUP_ERROR: 'LOGIN_ERROR',
    LOGOUT: 'LOGOUT',
}

export const initialState = {
    user: null,
    loading: false,
    error: null
}

export function reducer(state, action) {
        let user = null
        switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                user: null,
                loading: true,
                error: null
            }
        case actionTypes.LOGIN_SUCCESS:
            user = action.payload.user
            return {
                user: user,
                loading: false,
                error: null
            }
        case actionTypes.LOGIN_ERROR:
            return {
                user: null,
                loading: false,
                error: action.payload.error
            }
        case actionTypes.SIGNUP_REQUEST:
            return {
                user: null,
                loading: true,
                error: null
            }
        case actionTypes.SIGNUP_SUCCESS:
            user = action.payload.user
            return {
                user: user,
                loading: false,
                error: null
            }
        case actionTypes.SIGNUP_ERROR:
            return {
                user: null,
                loading: false,
                error: action.payload.error
            }
        case actionTypes.LOGOUT:
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            throw Error(`action type not supported: ${action}`)
    }
}