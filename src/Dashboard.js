import React from 'react'
import {Route} from 'react-router-dom'
// Switch
import NavBar from './NavBar'
import TeeTimeForm from './TeeTimeForm'
import UserTeeTimes from './UserTeeTimes'
import Friends from './Friends'
import UserTeeTime from './UserTeeTime';
import Friend from './Friend';
import Profile from './Profile';

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <NavBar {...props} />
            {/* <Switch> */}
            <Route exact path={'/'} render= {routeProps => {
                const currentDate = new Date()
                props.data.userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() < new Date(teeTimeB.date).getTime() ? -1 : 1)
                const upcomingTeeTime = props.data.userTeeTimes.find(teeTime => new Date(teeTime.date) > currentDate)
                const upcomingTeeTimeMessage = upcomingTeeTime ? `Your next upcoming tee time is:` : "You do not have any current upcoming tee times. Press tee times to add a new one!"
                
                const friendRequests = props.data.allUsers.filter(user => props.data.user.friendRequests.includes(user._id))
                const friendRequestsMessage = friendRequests.length > 0 ? `You have ${friendRequests.length} new friend requests.` : 'You have no new friend requests.'
                return(
                    <div>
                        <h4>{upcomingTeeTimeMessage}</h4>
                        {upcomingTeeTime && <UserTeeTime teeTime={upcomingTeeTime} {...props}/>}
                        <h4>{friendRequestsMessage}</h4>
                        {friendRequests && friendRequests.map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)}
                    </div>
                )
            }}/>
            <Route exact path={'/profile'} render= {routeProps => {
                return(
                    <div>
                        <Profile {...props}/>
                    </div>
                )
            }}/>
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
            {/* </Switch> */}
        </div>
    )
}