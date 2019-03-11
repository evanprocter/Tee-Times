import { createStore } from 'redux'

// const isDev = true
// const isEv = true
// const DB_URL = isEv ? 'https://api.evanprocter.com' : 'https://api.teetimes.collinargo.com'

setInterval(() => {
    store.dispatch(updateTime(new Date())) 
}, 60 * 1000)

export const getTeeTimeDate = (isAdmin, teeDate) => {
    // need to set this to within club hours here
    // if (!isAdmin) {
        // set year, months, day   holidays?
        // e.g. tee times are every ten minutes
        // set to next ten minute increment
        if (teeDate.getMinutes() % 10 !== 0) {
            teeDate.setMinutes(teeDate.getMinutes() + (10 - (teeDate.getMinutes() % 10)))
        } else {
            // this will get next ten min increment when at hh:00
            teeDate.setMinutes(teeDate.getMinutes() + 10)
        }
        // e.g. they close at 4 PM
        if (teeDate.getHours() >= 16) {
            // set hours
            // go to next day
            teeDate.setDate(teeDate.getDate() + 1)
            teeDate.setHours(8)
            teeDate.setMinutes(0)
        } 
        // e.g. they open at 8 AM
        if (teeDate.getHours() < 8) {
            teeDate.setHours(8)
            teeDate.setMinutes(0)
        }
    // holds all the values for the date object
    const date = {
        year: teeDate.getFullYear(),
        month: teeDate.getMonth(),
        day: teeDate.getDate(),
        dayOfTheWeek: teeDate.getDay(),
        hours: teeDate.getHours(),
        minutes: teeDate.getMinutes()
    }
    return date
}

// default state
const defaultState = {
    currentDate: new Date(),
    data: {
        user: {},
        userFriends: [],
        userTeeTimes: [],
        allUsers: [],
        allTeeTimes: [],
    },
    // automatically set admin to false
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
        date: {...getTeeTimeDate(false, new Date())},
        golfers: [],
        guests: 0
    },
    isLoading: false,
}

// CREATE USER
const ADD_USER = {
    type: 'ADD_USER'
}

// ADDING A TEE TIME
const ADD_TEE_TIME = {
    type: 'ADD_TEE_TIME'
}

// LOGGING IN A USER
const LOGIN_USER = {
    type: 'LOGIN_USER'
}

// LOGGING OUT A USER
const LOGOUT_USER = {
    type: 'LOGOUT_USER'
}

// REQUESTING DATA
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

// SELECTING A TEE TIME
const SELECT_TEE_TIME = {
    type: 'SELECT_TEE_TIME'
}

// UPDATING TIME
const UPDATE_TIME = {
    type: 'UPDATE_TIME'
}

// UPDATING TEE TIME
const UPDATE_TEE_TIME = {
    type: 'UPDATE_TEE_TIME'
}

// UPDATING WHEN SEARCHING FOR A FRIEND
const UPDATE_FRIEND_SEARCH = {
    type: 'UPDATE_FRIEND_SEARCH'
}

// UPDATING WHILE ADJUSTING TEE TIME SEARCH
const UPDATE_TEE_TIME_SEARCH = {
    type: 'UPDATE_TEE_TIME_SEARCH'
}

// SEARCHING FOR TEE TIMES
const SEARCH_TEE_TIMES = {
    type: 'SEARCH_TEE_TIMES'
}

// REQUESTING A NEW FRIEND
const REQUEST_FRIEND = {
    type: 'REQUEST_FRIEND'
}

// APPROVING A FRIEND
const APPROVE_FRIEND = {
    type: 'APPROVE_FRIEND'
}

// DENYING A FRIEND
const DENY_FRIEND = {
    type: 'DENY_FRIEND'
}

// DELETE A SINGLE USER AND INFO
const DELETE_USER = {
    type: 'DELETE_USER'
}

// DELETING A TEE TIME
const DELETE_TEE_TIME = {
    type: 'DELETE_TEE_TIME'
}

// exporting adding a user
export const addUser = (user) => {
    fetch(`/register`, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        // sprinkle in the added user
        ...ADD_USER, 
        isLoading: true
    }
} 

// export logging in a user
export const loginUser = (user) => {
    fetch(`/login`, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        // sprinkle in the login user
        ...LOGIN_USER,
        isLoading: true
    }
}

// logging out a user
export const logoutUser = () => {
    fetch(`/logout`, {
        method: 'get',
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...LOGOUT_USER,
        isLoading: true
    }
}

export const requestData = () => {
    fetch(`/data`, {
        method: 'get',
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...REQUEST_DATA,
        isLoading: true
    }
}

export const receiveData = (data) => {
    const userFriends = data.allUsers.filter(golfer => {
        if (golfer._id === data.user._id) {
            return false
        } else {
            return data.user.friends && data.user.friends.find(friendID => golfer._id === friendID)
        }
    })
    return {
        ...RECEIVE_DATA,
        data: {
            ...data,
            user: {
                ...data.user,
                pictureSrc: data.user.picture && `data:image/png;base64,${btoa(Buffer.from(data.user.picture.data))}`
            },
            userFriends,
            allUsers: [...data.allUsers.map(user => {
                return {...user, pictureSrc: user.picture && `data:image/png;base64,${btoa(Buffer.from(user.picture.data))}`}
            })]
        },
        isLoading: false
    }
}

export const updateUser = (user) => {
    fetch(`/updateUser`, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => store.dispatch(receiveData(data)))
    return {
        ...UPDATE_USER,
        isLoading: true
    }
}

export const updateTime = (currentDate) => {
    return {
        ...UPDATE_TIME,
        currentDate
    }
}

export const addTeeTime = (teeTime) => {
    fetch(`/teetime`, {
        method: 'post',
        credentials: 'include',
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
            dayOfTheWeek: date.getDay(),
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
    fetch(`/updateTeeTime`, {
        method: 'post',
        credentials: 'include',
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
    fetch(`/requestFriend`, {
        method: 'post',
        credentials: 'include',
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
    console.log(friends)
    fetch(`/approveFriend`, {
        method: 'post',
        credentials: 'include',
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
    fetch(`/denyFriend`, {
        method: 'post',
        credentials: 'include',
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
    fetch(`/user`, {
        method: 'delete',
        credentials: 'include',
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
    fetch(`/teetime`, {
        method: 'delete',
        credentials: 'include',
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

// ===========================================
//      REDUCER
// ===========================================
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
        case UPDATE_TIME.type:
        return {
            ...state,
            currentDate: action.currentDate,
            // update teeTimeSearch if it is less than currentTime and not currently searching
             // and not currently selected tee time
            teeTimeSearch: !(state.isSearching || state.selectedTeeTime._id)? {
                ...state.teeTimeSearch,
                date: getTeeTimeDate(state.isAdmin, action.currentDate)
                // {
                //     year: state.teeTimeSearch.date.year < action.currentDate.getFullYear() ? action.currentDate.getFullYear() : state.teeTimeSearch.date.year,
                //     month: state.teeTimeSearch.date.month < action.currentDate.getMonth() ? action.currentDate.getMonth() : state.teeTimeSearch.date.month,
                //     day: state.teeTimeSearch.date.day < action.currentDate.getDate() ? action.currentDate.getDate() : state.teeTimeSearch.date.day,
                //     dayOfTheWeek: state.teeTimeSearch.date.dayOfTheWeek < action.currentDate.getDay() ? action.currentDate.getDay() : state.teeTimeSearch.date.dayOfTheWeek,
                //     hours: state.teeTimeSearch.date.hours< action.currentDate.getHours() ? action.currentDate.getHours() : state.teeTimeSearch.date.hours,
                //     minutes: state.teeTimeSearch.date.minutes < action.currentDate.getMinutes() ? action.currentDate.getMinutes() : state.teeTimeSearch.date.minutes,
                // }
            } : state.teeTimeSearch
        }
        case ADD_TEE_TIME.type:
        return {
            ...state,
            teeTimeSearch: defaultState.teeTimeSearch,
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
                            {teeType: '',
                            date: {year: new Date().getFullYear(),
                                    month: false, 
                                    day: false,
                                    dayOfTheWeek: false, 
                                    hours: false, 
                                    minutes: false}, 
                            golfers: [], 
                            guests: 0} : 
                            defaultState.teeTimeSearch,
            isSearching: !state.isSearching,
            selectedTeeTime: {}
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