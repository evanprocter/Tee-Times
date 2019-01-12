import React, {Component} from 'react'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: '',
            usernameSearchTerm: ''
        }
    }

    render() {
    const {props} = this
    const submitDiv = (
        <div className="submitDiv">
            <label>
                Current password:
                <input
                    type='text' name='currentPassword'
                    placeholder={'current password'}
                    // value={this.state.usernameSearchTerm}
                    // onChange={event => props.updateFriendSearch(event.target.value)}
                    autoComplete='off'
                />
            </label>
            <input type='submit' value='submit'/>
        </div>
    )
    return (
        <form className='Profile'
            onSubmit={event => {
                event.preventDefault()
                const newUsername = event.target.newUsername.value
                const currentPassword = event.target.currentPassword.value
                const newPassword = event.target.newPassword.value
                // update the user
                props.updateUser({
                    ...props.data.user,
                    newUsername,
                    currentPassword,
                    newPassword
                })
                this.setState({
                    newPassword: '',
                    usernameSearchTerm: ''
                })
            }}
        >
            {/* should change password, username, profile pic */}
            {/* form with inputs labeled with current values*/}
            {/* <label>
                // change profile pic
                <img/>
                <input />
            </label> */}
            <div className='changeUsername'>
                <label>
                    Current username:
                    {` ${props.data.user.name} `}
                </label>
                <label>
                    {/* change user name */}
                    Change username:
                    <input 
                        type='text' name='newUsername'
                        placeholder={'new username'}
                        value={this.state.usernameSearchTerm}
                        onChange={event => {
                            this.setState({
                                usernameSearchTerm: event.target.value,
                            })
                        }}
                        autoComplete='off'
                        onFocus={() => {
                            this.setState({
                                newPassword: ''
                            })
                        }}
                    />
                </label>
                {(!props.data.allUsers.find(user => user.name.toLowerCase() === this.state.usernameSearchTerm.toLowerCase()) &&
                this.state.usernameSearchTerm) &&
                submitDiv}
            </div>
            <div className='changePassword'>
                <label>Change Password</label>
                <label>
                    New password:
                    <input 
                        type='text' name='newPassword'
                        placeholder={'new password'}
                        value={this.state.newPassword}
                        onChange={event => {
                            this.setState({
                                newPassword: event.target.value
                            })
                        }}
                        onFocus={() => {
                            this.setState({
                                usernameSearchTerm: ''
                            })
                        }}
                        autoComplete='off'
                    />
                </label>
                {this.state.newPassword && submitDiv}
            </div>
        </form>
    )}
}