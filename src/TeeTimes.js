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
                <Route
                    path="/"
                    render={routeProps => <Dashboard {...props}/>}
                />
            </Switch>
        </div>
        )
    }
}