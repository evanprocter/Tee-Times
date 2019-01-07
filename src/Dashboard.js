import React from 'react'
import { logoutUser, updateUser, addTeeTime, deleteTeeTime } from './store';
import TeeTimeForm from './TeeTimeForm'

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
            <div>Here is a list of your current and previous tee times!</div>
            <ul>{props.data.userTeeTimes.map(teeTime => <li>{teeTime.date}</li>)}</ul>
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