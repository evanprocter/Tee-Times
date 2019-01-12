import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <NavLink className='navlink' exact to='/'>
                <img src='./tee-ball.png' alt='a golf ball on a tee'/>
            </NavLink>
            <NavLink className='navlink' to='/profile'>
                <img src={props.data.user.pictureSrc} alt='user profile'/>
                {`${props.isAdmin ? ' - admin' : ''}`}
            </NavLink>
            <NavLink className="navlink" to='/teetimes'>Tee Times</NavLink>
            <NavLink className="navlink" to='/friends'>Friends</NavLink>
            <input type="button" value="Logout" onClick={event => props.logoutUser(props.data.user)}/>
        </div>
    )
}