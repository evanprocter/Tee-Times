import { createStore } from 'redux';

const defaultState = {
    data: {},
    isLoading: false
}

// CREATE USER
const ADD_USER = {
    type: 'ADD_USER'
}

const LOGIN_USER = {
    type: 'LOGIN_USER'
}

const LOGOUT_USER = {
    type: 'LOGOUT_USER'
}

// RETRIEVE USER DATA
const RECEIVE_DATA = {
    type: 'RECEIVE_DATA'
}

// UPDATE USER DATA
const UPDATE_USER = {
    type: 'UPDATE_USER'
}

// DELETE A SINGLE USER AND INFO
const DELETE_USER = {
    type: 'DELETE_USER'
}

export const addUser = (name) => {
    fetch('/user', {
        method: 'post',
        body: JSON.stringify({name}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...ADD_USER,
        isLoading: true
    }
}

export const loginUser = (name) => {
    fetch('/login', {
        method: 'post',
        body: JSON.stringify({name}),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...LOGIN_USER,
        isLoading: true
    }
}

export const logoutUser = (name) => {
    fetch('/logout')
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...LOGOUT_USER,
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
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application.json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...UPDATE_USER,
        isLoading: true
    }
}

export const deleteUser = (user) => {
    fetch('/user', {
        method: 'delete',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application.json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...DELETE_USER,
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
        case RECEIVE_DATA.type:
        return {
            ...state,
            data: action.data
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