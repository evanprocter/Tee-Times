import React from 'react'
import {Route} from 'react-router-dom'
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
            <Route exact path={'/'} render= {routeProps => {
                const currentDate = new Date()
                props.data.userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() < new Date(teeTimeB.date).getTime() ? -1 : 1)
                const upcomingTeeTime = props.data.userTeeTimes.find(teeTime => new Date(teeTime.date) > currentDate)
                const currentTeeTimeMessage = upcomingTeeTime ? `Your next upcoming tee time is:` : 
                `Your last tee time was:`
                const lastTeeTime = props.data.userTeeTimes[0]
                const friendRequests = props.data.allUsers.filter(user => props.data.user.friendRequests.includes(user._id))
                const friendRequestsMessage = friendRequests.length > 0 ? 
                `You have ${friendRequests.length} new friend requests.` : 'You have no new friend requests.'
                return(
                    <div className='statusMessages'>
                        <div className="teeTimeStatus">
                            <h4>{currentTeeTimeMessage}</h4>
                            {(upcomingTeeTime &&
                                <UserTeeTime teeTime={upcomingTeeTime} {...props}/>) ||
                            (lastTeeTime &&
                                <UserTeeTime teeTime={props.data.userTeeTimes[0]} {...props}/>) || 
                                <p>
                                    No previous tee times. Click tee times to add one!
                                </p>
                            }
                            {!upcomingTeeTime && <h4>Click Tee Times to make a new one!</h4>}
                        </div>
                        <div className="friendRequestStatus">
                            <h4>{friendRequestsMessage}</h4>
                            <Friends friends={friendRequests} {...props}></Friends>
                            {/* {(friendRequests.length > 0 && 
                            friendRequests.map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)) || */}
                            <p>
                                Click friends to add one!
                            </p>}
                        </div>
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
                    <div className='teeTimePage'>
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
        </div>
    )
}