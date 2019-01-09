import React from 'react'
import {Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import TeeTimeForm from './TeeTimeForm'
import UserTeeTimes from './UserTeeTimes'
import Friends from './Friends'

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <NavBar {...props} />
            <Switch>
                <Route exact path={'/teetimes'} render= {routeProps => {
                    return(
                        <div>
                            <TeeTimeForm {...props}/>
                            <UserTeeTimes {...props}/>
                        </div>
                    )
                }}/>
                <Route exact path={'/friends'} render= {routeProps => {
                    return(
                        <Friends {...props}/>
                    )
                }}/>
            </Switch>
        </div>
    )
}