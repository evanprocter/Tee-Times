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
        addUser: (name) => {
            dispatch(actions.addUser(name))
        },
        loginUser: (name, password) => {
            dispatch(actions.loginUser(name, password))
        },
        logoutUser: () => {
            dispatch(actions.logoutUser())
        },
        updateUser: (name) => {
            dispatch(actions.updateUser(name))
        },
        deleteUser: (name) => {
            dispatch(actions.updateUser(name))
        },

    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default withRouter(connector(TeeTimes))