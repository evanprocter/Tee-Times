import React, {Component} from 'react'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: '',
            friendSearchTerm: ''
        }
    }
    render() {
    const {props} = this
    const submitButton = <input type='submit' value='submit'/>
    return (
        <form className='Profile'>
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
                        type='text' name='friendName'
                        placeholder={'new username'}
                        value={this.state.friendSearchTerm}
                        onChange={event => {
                            this.setState({
                                friendSearchTerm: event.target.value,
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
                {(!props.data.allUsers.find(user => user.name.toLowerCase() === this.state.friendSearchTerm.toLowerCase()) &&
                this.state.friendSearchTerm) &&
                submitButton}
            </div>
            <div className='changePassword'>
                <label>Change Password</label>
                    
                <label>
                    Current password:
                    <input
                        type='text' name='currentPassword'
                        placeholder={'current password'}
                        // value={this.state.friendSearchTerm}
                        // onChange={event => props.updateFriendSearch(event.target.value)}
                        autoComplete='off'
                    />
                </label>
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
                                friendSearchTerm: ''
                            })
                        }}
                        autoComplete='off'
                    />
                </label>
                {this.state.newPassword && submitButton}
            </div>
        </form>
    )}
}