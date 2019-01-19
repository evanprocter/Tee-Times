import React from 'react'
import UserTeeTime from './UserTeeTime'

export default function UserTeeTimes(props) {
    const currentDate = new Date()
    // if user is admin or app is in search mode, return all tee times, otherwise just the user's tee times
    let userTeeTimes = (props.isAdmin || props.isSearching) ? props.data.allTeeTimes : props.data.userTeeTimes
    userTeeTimes = props.isSearching ? userTeeTimes.filter(teeTime => {
        for (let dateField in props.teeTimeSearch) {
            // if filtering on date
            if (dateField === 'date') {
                // teeTime has a Date object
                // teeTimeSearch has a date object, hydrate it
                const teeTimeDate = new Date(teeTime[dateField])
                teeTimeDate.setSeconds(0)
                teeTimeDate.setMilliseconds(0)
                const {year, month, day, hours, minutes} = props.teeTimeSearch.date
                const teeTimeSearchDate = new Date(
                                                    year,
                                                    month ? month : teeTimeDate.getMonth(), // these will not be 0 or the value of the tee time
                                                    day ? day : teeTimeDate.getDate(), 
                                                    hours ? hours : teeTimeDate.getHours(), 
                                                    minutes ? minutes : teeTimeDate.getMinutes()
                                                )
                // if there is a date selected and it matches
                if (teeTimeSearchDate.getTime() !== new Date(year, 0, 0, 0, 0).getTime()) {
                    if (teeTimeDate.getTime() !== teeTimeSearchDate.getTime()) {return false}
                } 
            // filtering on golfers
            } else if (dateField === 'golfers') {
                const matchingGolfers = teeTime[dateField].filter(golfer => props.teeTimeSearch[dateField].map(golfer => golfer._id).includes(golfer._id))
                // if there are golfers selected and some match tee times
                if (props.teeTimeSearch.golfers.length !== 0 && matchingGolfers.length !== 0) {return false}
            // filtering on guests or teeType
            } else {
                // there is a teeType selected and it's value equals the teetime we are checking
                if (props.teeTimeSearch.teeType && teeTime.teeType !== props.teeTimeSearch.teeType) {return false}
                else if (props.teeTimeSearch.guests > teeTime.guests) {return false}
            }
        }
        return true
    }) : userTeeTimes
    const futureTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) > currentDate)
        .sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? 1 : -1)
    const pastTeeTimes = userTeeTimes.filter(teeTime => new Date(teeTime.date) <= currentDate)
        .sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? -1 : 1)
    let selectedDate
    if (props.selectedTeeTime._id) {
        // if the selectedTeeTime date is not in the correct format
        if (props.selectedTeeTime.date.year) {
            const {year, month, day, hours, minutes} = props.selectedTeeTime.date
            selectedDate = new Date(year, month, day, hours, minutes)
        } else {
            selectedDate = new Date(props.selectedTeeTime.date)
        }
    }
    return (
        props.selectedTeeTime._id ? 
        <UserTeeTime teeTime={{...props.selectedTeeTime, date: selectedDate}} {...props}/> : 
        (<div className={`UserTeeTimes`}>
                <div className={`upcomingTeeTimes${props.isSearching ? ' searchingTeeTimes' : ''}`}>
                    <h4>{'Upcoming Tee Times'}</h4>
                    {futureTeeTimes.map(teeTime => {
                        return <UserTeeTime key={teeTime._id} isPast={false} teeTime={teeTime} {...props}/>
                    })}
                </div>
                <div className={`completedTeeTimes${props.isSearching ? ' searchingTeeTimes' : ''}`}>
                    <h4>{'Completed Tee Times'}</h4>
                    {pastTeeTimes.map(teeTime => {
                        return <UserTeeTime key={teeTime._id} isPast={true} teeTime={teeTime} {...props}/>
                    })}
                </div>
            </div>
        )
    )
}