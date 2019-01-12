import { createStore } from 'redux';

function getCorrectDate() {
    const currentDate = new Date()
    currentDate.getMinutes() % 10 === 0 || currentDate.setMinutes(currentDate.getMinutes() + (10 - (currentDate.getMinutes() % 10)))
    return currentDate
}

const defaultState = {
    data: {
        user: {},
        userFriends: [],
        userTeeTimes: [],
        allUsers: [],
        allTeeTimes: [],
    },
    isAdmin: false,
    selectedTeeTime: {
        _id: '',
        teeType: '',
        date: '',
        golfers: [],
        guests: 0
    },
    friendSearchTerm: '',
    isSearching: false,
    teeTimeSearch: {
        teeType: 'walk',
        date: {
            year: getCorrectDate().getFullYear(),
            month: getCorrectDate().getMonth(),
            day: getCorrectDate().getDate(),
            hours: getCorrectDate().getHours(),
            minutes: getCorrectDate().getMinutes()
        },
        golfers: [],
        guests: 0
    },
    isLoading: false,
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

const UPDATE_FRIEND_SEARCH = {
    type: 'UPDATE_FRIEND_SEARCH'
}

const UPDATE_TEE_TIME_SEARCH = {
    type: 'UPDATE_TEE_TIME_SEARCH'
}

const SEARCH_TEE_TIMES = {
    type: 'SEARCH_TEE_TIMES'
}

const REQUEST_FRIEND = {
    type: 'REQUEST_FRIEND'
}

const APPROVE_FRIEND = {
    type: 'APPROVE_FRIEND'
}

const DENY_FRIEND = {
    type: 'DENY_FRIEND'
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
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...ADD_USER,
        isLoading: true
    }
}

export const loginUser = (name, password) => {
    fetch('/login', {
        method: 'post',
        body: JSON.stringify({name, password}),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
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

export const addTeeTime = (teeTime) => {
    fetch('/teetime', {
        method: 'post',
        body: JSON.stringify({teeTime}),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...ADD_TEE_TIME,
        isLoading: true
    }
}

export const selectTeeTime = (teeTime) => {
    const date = new Date(teeTime.date)
    const formattedTeeTime = {
        ...teeTime, 
        date: {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes()
        }
    }
    return {
        ...SELECT_TEE_TIME,
        teeTime: formattedTeeTime
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

export const updateFriendSearch = friendSearchTerm => {
    return {
        ...UPDATE_FRIEND_SEARCH,
        friendSearchTerm
    }
}

export const updateTeeTimeSearch = teeTimeSearch => {
    return {
        ...UPDATE_TEE_TIME_SEARCH,
        teeTimeSearch
    }
}

export const searchTeeTimes = () => {
    return {
        ...SEARCH_TEE_TIMES
    }
}

export const requestFriend = friends => {
    fetch('/requestFriend', {
        method: 'post',
        body: JSON.stringify(friends),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...REQUEST_FRIEND,
        isLoading: true
    }
}
export const approveFriend = friends => {
    fetch('/approveFriend', {
        method: 'post',
        body: JSON.stringify(friends),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...APPROVE_FRIEND,
        isLoading: true
    }
}
export const denyFriend = friends => {
    fetch('/denyFriend', {
        method: 'post',
        body: JSON.stringify(friends),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...DENY_FRIEND,
        isLoading: true
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
            ...defaultState,
            isLoading: action.isLoading
        }
        case LOGOUT_USER.type:
        return {
            ...defaultState,
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
            // if the time is already selected than deselect it
            selectedTeeTime: action.teeTime._id !== state.selectedTeeTime._id ? action.teeTime : defaultState.teeTimeSearch,
            teeTimeSearch: action.teeTime._id !== state.selectedTeeTime._id ? action.teeTime : defaultState.teeTimeSearch
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
        case UPDATE_FRIEND_SEARCH.type:
        return {
            ...state,
            friendSearchTerm: action.friendSearchTerm
        }
        case UPDATE_TEE_TIME_SEARCH.type:
        return {
            ...state,
            // the teeTimeSearch will need to hold _id and other fields for the actual selectedTeeTime
            // in order to update that teeTime on the backend
            teeTimeSearch:  state.selectedTeeTime._id ? {...state.selectedTeeTime, ...action.teeTimeSearch} : action.teeTimeSearch,
        }
        case SEARCH_TEE_TIMES.type:
        return {
            ...state,
            teeTimeSearch: !state.isSearching ? 
                            {teeType: '', date: {year: new Date().getFullYear(), month: 0, day: 0, hours: 0, minutes: 0}, golfers: [], guests: 0} : 
                            defaultState.teeTimeSearch,
            isSearching: !state.isSearching
        }
        case REQUEST_FRIEND.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case APPROVE_FRIEND.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case DENY_FRIEND.type:
        return {
            ...state,
            isLoading: action.isLoading
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
            isAdmin: action.data.user.userType === 'admin',
            data: action.data,
            friendSearchTerm: '',
            // update selected tee time from data on the backend
            selectedTeeTime: action.data.allTeeTimes.find(teeTime => teeTime._id === state.selectedTeeTime._id) || state.selectedTeeTime
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