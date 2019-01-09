import React from 'react'
import UserTeeTime from './UserTeeTime'

export default function UserTeeTimes(props) {
    const currentDate = new Date()
    const userTeeTimes = props.data.user.userType === 'admin' ? props.data.allTeeTimes : props.data.userTeeTimes
    userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? -1 : 1)
    const futureTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) > currentDate)
    const pastTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) <= currentDate)
    return (
        <div className='UserTeeTimes'>
            <h4>Here is a list of your upcoming tee times!</h4>
            {futureTeeTimes.map(teeTime => <UserTeeTime isPast={false} teeTime={teeTime}{...props}/>)}
            <h4>Here are your completed tee times!</h4>
            {pastTeeTimes.map(teeTime =>  <UserTeeTime isPast={true} teeTime={teeTime}{...props}/>)}
        </div>
    )
}