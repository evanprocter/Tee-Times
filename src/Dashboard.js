import React from 'react'
import TeeTimeForm from './TeeTimeForm'
import UserTeeTimes from './UserTeeTimes'

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
            <div>Here is a list of your current and previous tee times!</div>
            <UserTeeTimes {...props}/>
            <input type="button" value="logout" onClick={event => props.logoutUser(props.data.user)}/>
            <TeeTimeForm {...props}/>
            <input type="button" value="Remove Tee Time" onClick={event => props.deleteTeeTime(props.selectedTeeTime)}/>
        </div>
    )
}