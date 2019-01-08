import React from 'react'
import Friend from './Friend'

export default function Friends(props) {
    return (
        <div className='Friends'>
            <input type='text' name='friendName' placeholder={'friend\'s name'} value={props.friendSearch} onChange={event => {
                console.log(event.target.value)
                props.updateFriendSearch(event.target.value)
            }}/>
            {props.friendSearchTerm === '' ? 
            props.data.userFriends.map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)
            :
            props.data.allUsers.filter(golfer => golfer.name.includes(props.friendSearchTerm)).map(friend => <Friend key={friend._id} golfer={friend} {...props}/>)}
        </div>
    )
}