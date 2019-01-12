import React from 'react'

export default function Profile(props) {
    return (
        <form className='Profile'>
            {/* should change password, username, profile pic */}
            {/* form with inputs labeled with current values*/}
            <label>
                {/* change profile pic */}
                <img/>
                <input />
            </label>
            <div className='changeUsername'>
                <label>
                    Current username:
                    {` ${props.data.user.name} `}
                </label>
                <label>
                    {/* change user name */}
                    Change username:
                    <input />
                </label>
            </div>
            <div className='changePassword'>
                <label>
                    Change password:
                    <input />
                </label>    
                <label>
                    Current password:
                    <input />
                </label>
            </div>
        </form>
    )
}