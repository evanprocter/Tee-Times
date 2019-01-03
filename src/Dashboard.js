import React from 'react'
import { logoutUser, updateUser, addTeeTime } from './store';

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
            <div>Here is a list of your current and previous tee times!</div>
            <ul>{props.data.user.teeTimes.map(teeTime => teeTime.date)}</ul>
           <input type="button" value="logout" onClick={event => {
               logoutUser(props.data.user)}}/>
            <input type="button" value="newTeeTime" onClick={event => {
                const newTeeTime = new Date()
                addTeeTime(newTeeTime)
            }}
           />
        </div>
    )
}