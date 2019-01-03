import React from 'react'
import { logoutUser, updateUser } from './store';

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
           <input type="button" value="logout" onClick={event => {
               logoutUser(props.data.user)}}/>
            <input type="button" value="newTeeTime" onClick={event => {
                const newTeeTime = new Date()
                updateUser({...props.data.user, teeTimes: [...props.data.user.teeTimes, newTeeTime] })
            }}
           />
        </div>
    )
}