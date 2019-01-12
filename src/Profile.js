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
            <label>
                {/* change user name */}
                {}
                <input />
            </label>
            <label>
                Change password, requires current password
                <input />
                <input />
            </label>
        </form>
    )
}