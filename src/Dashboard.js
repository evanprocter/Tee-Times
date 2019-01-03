import React from 'react'
import { logoutUser } from './store';

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
            // add logout button
           <a href="#" onClick={this.logoutUser()}>LOGOUT</a>
        </div>
    )
}