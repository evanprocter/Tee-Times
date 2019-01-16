import React from 'react'
import Friend from './Friend'

export default function Friends(props) {
   const friends = props.friends || props.data.allUsers
    return (
        <div className='Friends'>
           {!props.friends && <input 
                type='text' name='friendName' 
                placeholder={'friend\'s name'} 
                value={props.friendSearchTerm} 
                onChange={event => props.updateFriendSearch(event.target.value)}
                autoComplete='off'
            />}
            {/* {props.friendSearchTerm === '' ? 
            props.d.map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)
            : */}
            <div className="friendsList">
                {friends
                .filter(golfer => golfer.name.includes(props.friendSearchTerm) && golfer._id !== props.data.user._id)
                .map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)}
            </div>
       </div>
    )
} 