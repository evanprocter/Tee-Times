import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import LoginPage from './LoginPage'

export default function TeeTimes(props) {
   return (props.isLoading && <LoadingPage />) ||
   (
    <div className="TeeTimes" >
        <Switch>
            <Route exact
                path="/login"
                render={routeProps => <LoginPage history={routeProps.history} loginUser={props.loginUser} addUser={props.addUser}/>}
                />
        </Switch>
    </div>
    )
}