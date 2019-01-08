import React from 'react'
import NavBar from './NavBar'
import TeeTimeForm from './TeeTimeForm'
import UserTeeTimes from './UserTeeTimes'

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <NavBar {...props} />
            <TeeTimeForm {...props}/>
            <UserTeeTimes {...props}/>
        </div>
    )
}