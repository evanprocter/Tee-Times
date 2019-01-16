import React from 'react'
import Friend from './Friend'

export default function Friends(props) {
    // const userFriends = [...props.data.userFriends, ...props.data.allUsers.filter(user => props.data.user.friendRequests.includes(user._id) || props.data.user.requestedFriends.includes(user._id))]
    return (
        <div className='Friends'>
            <input 
                type='text' name='friendName' 
                placeholder={'friend\'s name'} 
                value={props.friendSearchTerm} 
                onChange={event => props.updateFriendSearch(event.target.value)}
                autoComplete='off'
            />
            {/* {props.friendSearchTerm === '' ? 
            props.d.map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)
            : */}
            <div className="friendsList">
                {props.data.allUsers
                .filter(golfer => golfer.name.includes(props.friendSearchTerm) && golfer._id !== props.data.user._id)
                .map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)}
            </div>
       </div>
    )
} 