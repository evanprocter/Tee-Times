import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <h1 onClick={event => {
                props.selectTeeTime(props.selectedTeeTime)
                props.history.push('/')
            }}>{`${props.data.user.name}${props.data.user.userType === 'admin' ? ' - admin' : ''}`}</h1>
            <input type="button" value="logout" onClick={event => props.logoutUser(props.data.user)}/>
            <NavLink className="navlink" to='/teetimes'>Tee Times</NavLink>
            <NavLink className="navlink" to='/friends'>Friends</NavLink>
        </div>
    )
}