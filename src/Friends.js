import React from 'react'
import Friend from './Friend'

export default function Friends(props) {
    const userFriends = [...props.data.userFriends, ...props.data.user.friendRequests.map(friendRequest => props.data.allUsers.find(golfer => golfer.requestedFriends.includes(friendRequest)))]
    return (
        <div className='Friends'>
            <input type='text' name='friendName' placeholder={'friend\'s name'} value={props.friendSearch} onChange={event => {
                console.log(event.target.value)
                props.updateFriendSearch(event.target.value)
            }}/>
            {props.friendSearchTerm === '' ? 
            userFriends.map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)
            :
            props.data.allUsers.filter(golfer => golfer.name.includes(props.friendSearchTerm) && golfer._id !== props.data.user._id).map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)}
        </div>
    )
}