import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'
import Profile from './Profile'

export default class TeeTimes extends Component {
    componentDidMount() {
        this.props.requestData()
    }

    render() {
        const props = {...this.props}
        const isLoggedIn = props.data.user && props.data.user._id
        return (props.isLoading && <LoadingPage />) ||
        (!isLoggedIn && (props.location.pathname !== '/login' && <Redirect to='/login'/>)) ||
        (
        <div className="TeeTimes" >
            <Switch>
                <Route exact
                    path="/login"
                    render={routeProps => <LoginPage {...props}/>}
                />
                <Route exact
                    path="/"
                    render={routeProps => <Dashboard {...props}/>}
                />
                <Route exact
                    path='/profile'
                    render={routeProps => <Profile {...props}/>}
                />
            </Switch>
        </div>
        )
    }
}