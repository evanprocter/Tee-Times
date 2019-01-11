import React from 'react'

export default function Friend(props) {
    return (
        <div className='Friend'>
            <h4>{props.golfer.name}</h4>
            {/* depending on relationship, show various buttons */}
            {((!props.data.userFriends.map(friend => friend._id).includes(props.golfer._id) 
            && props.data.user.friendRequests.find(friendRequest => friendRequest === props.golfer._id))
            && 
                ( 
                    <>
                        <input type='button' value='approve friend' onClick={() => props.approveFriend({approvingFriend: props.data.user, approvedFriend: props.golfer})}/>
                        <input type='button' value='deny friend' onClick={() => props.denyFriend({denyingFriend: props.data.user, deniedFriend: props.golfer})}/>
                    </>
                )
            ) ||
            (!props.data.userFriends.map(friend => friend._id).includes(props.golfer._id) && 
            ((!props.golfer.friendRequests.find(friendRequest => friendRequest === props.data.user._id)
            && 
            <input type='button' value='request friend' onClick={() => props.requestFriend({requestingFriend: props.data.user, requestedFriend: props.golfer})}/>) 
            ||
            <p>friend requested</p>
            ))}
        </div>
    )
}