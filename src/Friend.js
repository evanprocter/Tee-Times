import React from 'react'

export default function Friend(props) {
    return (
        <div className='Friend'>
            <h4>{props.golfer.name}</h4>
            {/* depending on relationship, show various buttons */}
           {!props.data.userFriends.map(friend => friend._id).includes(props.golfer._id) && 
           <input type='button' value='request friend' onClick={() => props.requestFriend({requestingFriend: props.data.user, requestedFriend: props.golfer})}/>}
        </div>
    )
}