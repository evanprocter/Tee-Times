import React from 'react'

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <h1 onClick={event => props.history.push('/')}>{`${props.data.user.name}${props.data.user.userType === 'admin' ? ' - admin' : ''}`}</h1>
            <input type="button" value="logout" onClick={event => props.logoutUser(props.data.user)}/>
            <button onClick={() => props.history.push('/profile')}>profile page</button>
        </div>
    )
}