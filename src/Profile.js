import React from 'react'
import NavBar from './NavBar'
import FriendForm from './FriendForm'

export default function Profile(props) {
    return (
        <div className='Profile'>
            <NavBar {...props} />
            <FriendForm {...props}/>
        </div>
    )
}