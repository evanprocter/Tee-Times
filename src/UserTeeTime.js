import React from 'react'

export default function UserTeeTime(props) {
        const {teeTime, isPast, isSearching} = props
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
            onClick={isPast || isSearching ? null : event => {
                if (props.location.pathname !== '/teetimes') {
                    props.history.push('/teetimes')
                } else {
                    props.selectTeeTime(teeTime)
                }
            }}>
                <p>{dateString}</p>
                <p>{teeTime.teeType}</p>
                <p>{teeTime.golfers.filter(golferID => props.isAdmin || golferID !== props.data.user._id)
                    .map(golferID => {
                        console.log(golferID)
                        const golfer =  props.data.allUsers.find(golfer => golfer._id === golferID)
                        console.log(golfer)
                        return golfer.name
                        }).join(', ')}
                </p>
                {teeTime.guests > 0 && <p>{`${teeTime.guests} guests`}</p>}
                {props.selectedTeeTime._id === teeTime._id && <input type="button" value="Remove Tee Time" onClick={event => props.deleteTeeTime(props.selectedTeeTime)}/>}
            </div>
        
    )
}