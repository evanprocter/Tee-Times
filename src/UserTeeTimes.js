import React from 'react'
import UserTeeTime from './UserTeeTime'

export default function UserTeeTimes(props) {
    const currentDate = new Date()
    let userTeeTimes = props.isAdmin || props.isSearching ? props.data.allTeeTimes : props.data.userTeeTimes
    userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? -1 : 1)
    userTeeTimes = props.isSearching ? userTeeTimes.filter(teeTime => {
        for (let field in props.teeTimeSearch) {
            if (field === 'date') {
                // teeTime has a Date object
                // teeTimeSearch has a date object
                // hydrate the date object
                const teeTimeDate = new Date(teeTime[field])
                teeTimeDate.setSeconds(0)
                teeTimeDate.setMilliseconds(0)
                const {year, month, day, hours, minutes} = props.teeTimeSearch.date
                const teeTimeSearchDate = new Date(year, month, day, hours, minutes)
                // if there is a date selected and it matches
                if (teeTimeSearchDate.getTime() !== new Date(0, 0, 0, 0, 0).getTime() && teeTimeDate.getTime() !== teeTimeSearchDate.getTime()) {return false}
            } else if (field === 'golfers') {
                const matchingGolfers = teeTime[field].filter(golfer => props.teeTimeSearch[field].map(golfer => golfer._id).includes(golfer._id))
                // if there are golfers selected and some match tee times
                if (props.teeTimeSearch.golfers.length !== 0 && matchingGolfers.length === 0) {return false}
            } else {
                // there is a teeType selected and it's value equals the teetime we are checking
                if (props.teeTimeSearch.teeType && teeTime[field] !== props.teeTimeSearch[field]) {return false}
            }
        }
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