import React from 'react'

export default function UserTeeTime(props) {
        const {teeTime, isPast} = props
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
        return (
            <div key={teeTime._id} className={`teeTime${editClassName}`} 
            onClick={isPast ? null : event => props.selectTeeTime(teeTime)}>
                <p>{dateString}</p>
                <p>{teeTime.teeType}</p>
                <p>{teeTime.golfers.filter(golfer => props.data.user.userType === 'admin' || golfer._id !== props.data.user._id).map(golfer => golfer.name).join(', ')}</p>
                {teeTime.guests > 0 && <p>{`${teeTime.guests} guests`}</p>}
                {props.selectedTeeTime._id === teeTime._id && <input type="button" value="Remove Tee Time" onClick={event => props.deleteTeeTime(props.selectedTeeTime)}/>}
            </div>
        
    )
}