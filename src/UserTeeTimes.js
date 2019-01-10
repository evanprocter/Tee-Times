import React from 'react'
import UserTeeTime from './UserTeeTime'

export default function UserTeeTimes(props) {
    const currentDate = new Date()
    let userTeeTimes = props.data.user.userType === 'admin' ? props.data.allTeeTimes : props.data.userTeeTimes
    userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? -1 : 1)
    userTeeTimes = props.isSearching ? userTeeTimes.filter(teeTime => {
        for (let field in props.teeTimeSearch) {
            console.log(field)
            if (field === 'date') {
                const teeTimeDate = new Date(teeTime[field])
                teeTimeDate.setSeconds(0)
                teeTimeDate.setMilliseconds(0)
                if (teeTimeDate.getTime() !== props.teeTimeSearch[field].getTime()) {return false}
            } else if (field === 'golfers') {
                console.log(teeTime[field], props.teeTimeSearch[field])
                const matchingGolfers = teeTime[field].filter(golfer => props.teeTimeSearch[field].map(golfer => golfer._id).includes(golfer._id))
                console.log(matchingGolfers.length, props.teeTimeSearch[field].length)
                if (matchingGolfers.length !== teeTime[field].length) {return false}
            } else {
                console.log(teeTime[field], props.teeTimeSearch[field])
                if (teeTime[field] !== props.teeTimeSearch[field]) {return false}
            }
        }
        console.log("tee times match")
        return true
    }) : userTeeTimes
    const futureTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) > currentDate)
    const pastTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) <= currentDate)
    return (
        <div className={`UserTeeTimes${props.isSearching ? ' searchingTeeTimes' : ''}`}>
            <input type="button" value="Tee Time Search" onClick={props.searchTeeTimes}/>
            <h4>Here is a list of your upcoming tee times!</h4>
            {futureTeeTimes.map(teeTime => <UserTeeTime key={teeTime._id} isPast={false} teeTime={teeTime}{...props}/>)}
            <h4>Here are your completed tee times!</h4>
            {pastTeeTimes.map(teeTime =>  <UserTeeTime key={teeTime._id} isPast={true} teeTime={teeTime}{...props}/>)}
        </div>
    )
}