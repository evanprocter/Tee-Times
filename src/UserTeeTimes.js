import React from 'react'
import UserTeeTime from './UserTeeTime'

export default function UserTeeTimes(props) {
    const currentDate = new Date()
    const userTeeTimes = props.data.user.userType === 'admin' ? props.data.allTeeTimes : props.data.userTeeTimes
    userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? -1 : 1)
    props.isSearching && userTeeTimes.filter(teeTime => {
        for (let field in props.teeTimeSearch) {
            console.log(new Date(teeTime[field]))
            console.log(props.teeTimeSearch[field])
            if (field === 'date') {
                if (new Date(teeTime[field]) !== props.teeTimeSearch[field]) {return false}
            } else if (field === 'golfers') {

            } else {
                if (teeTime[field] !== props.teeTimeSearch[field]) {return false}
            }
        }
        return true
    })
    const futureTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) > currentDate)
    const pastTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) <= currentDate)
    return (
        <div className='UserTeeTimes'>
            <input type="button" value="Tee Time Search" onClick={props.searchTeeTimes}/>
            <h4>Here is a list of your upcoming tee times!</h4>
            {futureTeeTimes.map(teeTime => <UserTeeTime key={teeTime._id} isPast={false} teeTime={teeTime}{...props}/>)}
            <h4>Here are your completed tee times!</h4>
            {pastTeeTimes.map(teeTime =>  <UserTeeTime key={teeTime._id} isPast={true} teeTime={teeTime}{...props}/>)}
        </div>
    )
}