import React from 'react'

export default function UserTeeTimes(props) {
    const userTeeTimes = props.data.user.userType === 'admin' ? props.data.allTeeTimes : props.data.userTeeTimes
    return (
        <div className='UserTeeTimes'>
            <h4>Here is a list of your current and previous tee times!</h4>
            {userTeeTimes.sort((teeTimeA, teeTimeB) => new Date(teeTimeA.date).getTime() > new Date(teeTimeB.date).getTime() ? -1 : 1)
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
                    return (
                        <div key={teeTime._id} className={`teeTime${editClassName}`} 
                        onClick={event => props.selectTeeTime(teeTime)}>
                            <p>{dateString}</p>
                            <p>{teeTime.golfers.filter(golfer => props.data.user.userType === 'admin' || golfer._id !== props.data.user._id).map(golfer => golfer.name).join(', ')}</p>
                            {props.selectedTeeTime._id === teeTime._id && <input type="button" value="Remove Tee Time" onClick={event => props.deleteTeeTime(props.selectedTeeTime)}/>}
                        </div>
                    )
                })
            }
        </div>
    )
}