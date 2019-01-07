import React from 'react'
import { logoutUser, updateUser, addTeeTime, deleteTeeTime } from './store';
import TeeTimeForm from './TeeTimeForm'

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
            <div>Here is a list of your current and previous tee times!</div>
            <ul>{props.data.userTeeTimes.map(teeTime => {
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
                return <li key={teeTime._id} className={`teeTime${editClassName}`}>{dateString}</li>
            })}</ul>
            <input type="button" value="logout" onClick={event => {
               logoutUser(props.data.user)}}/>
            <TeeTimeForm {...props}/>
            <input type="button" value="Remove Tee Time" onClick={event => { 
                deleteTeeTime()
            }}
            />
        </div>
    )
}