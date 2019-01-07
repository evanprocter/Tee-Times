import React from 'react'

export default function UserTeeTimes(props) {
    return (
        <ul className='UserTeeTimes'>
        {props.data.userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? -1 : 1)
            .map(teeTime => {
                const editClassName = teeTime._id === props.selectedTeeTime._id ? ' teeTimeEdit' : ''
                const teeDate = new Date(teeTime.date)
                const dateOptions = {
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    weekday: 'short',
                    hour: 'numeric',
                    minute: 'numeric'
                }
                const dateString = new Intl.DateTimeFormat('en-US', dateOptions).format(teeDate)
                return <li key={teeTime._id} className={`teeTime${editClassName}`} onClick={event => props.selectTeeTime(teeTime)}>{dateString}</li>
            })
        }
        </ul>
    )
}