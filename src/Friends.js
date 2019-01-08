import React from 'react'
import Friend from './Friend'

export default function Friends(props) {
    return (
        <div className='Friends'>
            <input type='text' name='friendName' placeholder={'friend\'s name'} value={props.friendSearch} onChange={event => props.updateFriendSearch(event.target.value)}/>
            {props.friendSearch !== '' ? 
            props.data.userFriends.map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)
            :
            props.data.allUsers.filter(golfer => golfer.name.includes(props.friendSearch)).map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)}
        </div>
    )
}