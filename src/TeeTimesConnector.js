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
        addUser: (name, password) => {
            dispatch(actions.addUser(name, password))
        },
        loginUser: (name, password) => {
            dispatch(actions.loginUser(name, password))
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
        deleteUser: (user) => {
            dispatch(actions.updateUser(user))
        },
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default withRouter(connector(TeeTimes))