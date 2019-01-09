import React from 'react'
import {Route, Switch} from 'react-router-dom'
import NavBar from './NavBar'
import TeeTimeForm from './TeeTimeForm'
import UserTeeTimes from './UserTeeTimes'
import Friends from './Friends'
import UserTeeTime from './UserTeeTime';

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
                <Route exact path={'/'} render= {routeProps => {
                    const currentDate = new Date()
                    props.data.userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() < new Date(teeTimeB.date).getTime() ? -1 : 1)
                    const upcomingTeeTime = props.data.userTeeTimes.find(teeTime => new Date(teeTime.date) > currentDate)
                    const upcomingTeeTimeMessage = upcomingTeeTime ? `Your next upcoming tee time is:` : "You do not have any current upcoming tee times. Press tee times to add a new one!"
                    return(
                        <div>
                            <h4>{upcomingTeeTimeMessage}</h4>
                            {upcomingTeeTime && <UserTeeTime teeTime={upcomingTeeTime}{...props}/>}
                        </div>
                    )
                }}/>
            </Switch>
        </div>
    )
}