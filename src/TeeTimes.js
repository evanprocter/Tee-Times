import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'

export default class TeeTimes extends Component {
    componentDidMount() {
        this.props.requestData()
    }

    render() {
        const {props} = this
        const isLoggedIn = props.data.user && props.data.user._id
        // if they are not logged in && (if they are not at /login && send them to login)
        return (!isLoggedIn && (props.location.pathname !== '/login' && <Redirect to='/login'/>)) ||
        (isLoggedIn && (props.location.pathname === '/login' && <Redirect to='/'/>)) || 
        ( 
            <div className="TeeTimes" >
                {!isLoggedIn && <h1>Tee Times</h1>}
                {props.isLoading && <LoadingPage />}
                <Switch>
                    <Route 
                        exact
                        path="/login"
                        render={routeProps => <LoginPage {...props}/>}
                    />
                    <Route
                        path="/"
                        render={routeProps => <Dashboard {...props}/>}
                    />
                </Switch>
            </div>
        )
    }
}