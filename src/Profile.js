import React from 'react'
import NavBar from './NavBar'
import Friends from './Friends'

export default function Profile(props) {
    return (
        <div className='Profile'>
            <NavBar {...props} />
            <Friends {...props}/>
        </div>
    )
}