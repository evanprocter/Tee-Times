import React from 'react'
import { logoutUser } from './store';

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
           <input type="button" value="logout" onClick={event => {
               logoutUser(props.data.user)
           }}/>
        </div>
    )
}