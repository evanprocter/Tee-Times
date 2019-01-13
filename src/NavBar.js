import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <NavLink className='navlink' exact to='/'>
                <img src='./tee_hole.png' alt='a golf ball on a tee'/>
            </NavLink>
            <NavLink className='navlink' to='/profile'>
                <img src={props.data.user.pictureSrc} alt='user profile'/>
                <p>{`${props.data.user.name}${props.isAdmin ? ' - admin' : ''}`}</p>
            </NavLink>
            <NavLink className="navlink" to='/teetimes'>Tee Times</NavLink>
            <NavLink className="navlink" to='/friends'>Friends</NavLink>
            <input type="button" value="Logout" onClick={event => props.logoutUser(props.data.user)}/>
        </div>
    )
}