import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from './store'
import TeeTimes from './TeeTimes'

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        // CREATE
        addUser: (user) => {
            dispatch(actions.addUser(user))
        },
        addTeeTime: (teeTime) => {
            dispatch(actions.addTeeTime(teeTime))
        },
        loginUser: (user) => {
            dispatch(actions.loginUser(user))
        },
        requestData: () => {
            dispatch(actions.requestData())
        },
        logoutUser: () => {
            dispatch(actions.logoutUser())
        },
        updateUser: (user) => {
            dispatch(actions.updateUser(user))
        },
        getCorrectDate: (isAdmin) => {
            dispatch(actions.getCorrectDate(isAdmin))
        },
        selectTeeTime: (teeTime) => {
            dispatch(actions.selectTeeTime(teeTime))
        },
        updateTeeTime: (teeTime) => {
            dispatch(actions.updateTeeTime(teeTime))
        },
        updateFriendSearch: (friendSearchTerm) => {
            dispatch(actions.updateFriendSearch(friendSearchTerm))
        },
        updateTeeTimeSearch: (teeTimeSearch) => {
            dispatch(actions.updateTeeTimeSearch(teeTimeSearch))
        },
        searchTeeTimes: () => {
            dispatch(actions.searchTeeTimes())
        },
        requestFriend: (friends) => {
            dispatch(actions.requestFriend(friends))
        },
        approveFriend: (friends) => {
            dispatch(actions.approveFriend(friends))
        },
        denyFriend: (friends) => {
            dispatch(actions.denyFriend(friends))
        },
        deleteUser: (user) => {
            dispatch(actions.deleteUser(user))
        },
        deleteTeeTime: (teeTime) => {
            // double check
            dispatch(actions.deleteTeeTime(teeTime))
        } 
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default withRouter(connector(TeeTimes))