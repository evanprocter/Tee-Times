import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import LoginPage from './LoginPage'
import Dashboard from './Dashboard'

export default function TeeTimes(props) {
    const isLoggedIn = props.data.user && props.data.user._id
    return (props.isLoading && <LoadingPage />) ||
    (!isLoggedIn && (props.location.pathname !== '/login' && <Redirect to='/login'/>)) ||
    (
    <div className="TeeTimes" >
        <Switch>
            <Route exact
                path="/login"
                render={routeProps => <LoginPage history={routeProps.history} loginUser={props.loginUser} addUser={props.addUser}/>}
            />
            <Route exact
                path="/"
                render={routeProps => <Dashboard {...props}/>}
            />
        </Switch>
    </div>
    )
}