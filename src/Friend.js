import React from 'react'

export default function Friend(props) {
    const isFriend = props.data.userFriends.map(friend => friend._id).includes(props.golfer._id)
    const friendRequested = props.data.user.friendRequests.find(friendRequest => friendRequest === props.golfer._id)
    return (
        <div className='Friend'>
            <img src={props.golfer.pictureSrc} alt={`user's friend ${props.golfer.name}`}/>
            <h4>{props.golfer.name}</h4>
            {/* depending on relationship, show various buttons */}
            {((!isFriend
            && friendRequested)
            && 
                ( 
                    <>
                        <input type='button' value='approve friend' onClick={() => props.approveFriend({approvingFriend: props.data.user, approvedFriend: props.golfer})}/>
                        <input type='button' value='deny friend' onClick={() => props.denyFriend({denyingFriend: props.data.user, deniedFriend: props.golfer})}/>
                    </>
                )
            ) ||
            (!isFriend && 
            ((!friendRequested
            && 
            <input type='button' value='request friend' onClick={() => props.requestFriend({requestingFriend: props.data.user, requestedFriend: props.golfer})}/>) 
            ||
            <p>friend requested</p>
            ))}
        </div>
    )
}