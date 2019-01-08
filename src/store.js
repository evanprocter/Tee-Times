import { createStore } from 'redux';

const defaultState = {
    data: {
        user: {},
        userFriends: [],
        userTeeTimes: [],
        allUsers: [],
        allTeeTimes: [],
    },
    selectedTeeTime: {},
    friendSearch: '',
    isLoading: false
}

// CREATE USER
const ADD_USER = {
    type: 'ADD_USER'
}

const ADD_TEE_TIME = {
    type: 'ADD_TEE_TIME'
}

const LOGIN_USER = {
    type: 'LOGIN_USER'
}

const LOGOUT_USER = {
    type: 'LOGOUT_USER'
}

const REQUEST_DATA = {
    type: 'REQUEST_DATA'
}

// RETRIEVE USER DATA
const RECEIVE_DATA = {
    type: 'RECEIVE_DATA'
}

// UPDATE USER DATA
const UPDATE_USER = {
    type: 'UPDATE_USER'
}

const SELECT_TEE_TIME = {
    type: 'SELECT_TEE_TIME'
}

const UPDATE_TEE_TIME = {
    type: 'UPDATE_TEE_TIME'
}

const UPDATE_SEARCH = {
    type: 'UPDATE_SEARCH'
}

// DELETE A SINGLE USER AND INFO
const DELETE_USER = {
    type: 'DELETE_USER'
}

const DELETE_TEE_TIME = {
    type: 'DELETE_TEE_TIME'
}

export const addUser = (name, password, userType) => {
    fetch('/register', {
        method: 'post',
        body: JSON.stringify({name, password, userType}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...ADD_USER,
        isLoading: true
    }
}

export const addTeeTime = (teeTime) => {
    fetch('/teetime', {
        method: 'post',
        body: JSON.stringify({teeTime}),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...ADD_TEE_TIME,
        isLoading: true
    }
}

export const loginUser = (name, password) => {
    fetch('/login', {
        method: 'post',
        body: JSON.stringify({name, password}),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...LOGIN_USER,
        isLoading: true
    }
}

export const logoutUser = () => {
    fetch('/logout')
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...LOGOUT_USER,
        isLoading: true
    }
}

export const requestData = () => {
    fetch('/data')
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...REQUEST_DATA,
        isLoading: true
    }
}

export const receiveData = (data) => {
    return {
        ...RECEIVE_DATA,
        data,
        isLoading: false
    }
}

export const updateUser = (user) => {
    fetch('/updateUser', {
        method: 'post',
        body: JSON.stringify({user}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...UPDATE_USER,
        isLoading: true
    }
}

export const selectTeeTime = (teeTime) => {
    return {
        ...SELECT_TEE_TIME,
        teeTime
    }
}

export const updateTeeTime = (teeTime) => {
    fetch('/updateTeeTime', {
        method: 'post',
        body: JSON.stringify({teeTime}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...UPDATE_TEE_TIME,
        isLoading: true
    }
}

export const updateFriendSearch = friendSearch => {
    return {
        ...UPDATE_SEARCH,
        friendSearch
    }
}

export const deleteUser = (user) => {
    fetch('/user', {
        method: 'delete',
        body: JSON.stringify({user}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...DELETE_USER,
        isLoading: true
    }
}

export const deleteTeeTime = (teeTime) => {
    fetch('/teetime', {
        method: 'delete',
        body: JSON.stringify({teeTime}),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...DELETE_TEE_TIME,
        isLoading: true
    }
}

// REDUCER
const teeTimes = (state=defaultState, action) => {
    if (!action) {
        return state
    }
    switch (action.type){
        // CREATE
        case ADD_USER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case LOGIN_USER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case LOGOUT_USER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case UPDATE_USER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case DELETE_USER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case ADD_TEE_TIME.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case SELECT_TEE_TIME.type:
        return {
            ...state,
            selectedTeeTime: action.teeTime._id !== state.selectedTeeTime._id ? action.teeTime : {}
        }
        case UPDATE_TEE_TIME.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case DELETE_TEE_TIME.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case UPDATE_SEARCH.type:
        return {
            ...state,
            friendSearch: action.friendSearch
        }
        case REQUEST_DATA.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case RECEIVE_DATA.type:
        return {
            ...state,
            isLoading: action.isLoading,
            data: action.data,
            selectedTeeTime: {}
        }
        default:
        return state   
    }
}

const store = createStore(
    teeTimes,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;