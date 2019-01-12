import React, {Component} from 'react'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pictureUploaded: false,
            newPassword: '',
            usernameSearchTerm: '',
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
                    autoComplete='off'
                />
            </label>
            <input type='submit' value='submit'/>
            <input type='reset' value='reset'/>
        </div>
    )
    return (
        <form className='Profile'
            onSubmit={event => {
                event.preventDefault()
                console.log(event.target.newPicture.files[0])
                const newUsername = event.target.newUsername.value
                const currentPassword = event.target.currentPassword.value
                const newPassword = event.target.newPassword.value
                const newPicture = event.target.newPicture.files[0]
                // update the user
                props.updateUser({
                    ...props.data.user,
                    newUsername,
                    currentPassword,
                    newPassword,
                    newPicture
                })
                this.setState({
                    newPassword: '',
                    usernameSearchTerm: '',
                    pictureUploaded: false,
                }, () => event.target.newPicture.value = '')
            }}
            onReset={() => this.setState({newPassword: '', usernameSearchTerm: '', pictureUploaded: false})}
        >
            {/* should change password, username, profile pic */}
            {/* form with inputs labeled with current values*/}
            <div className='changePicture'>
                <label>
                    Change picture:
                    {/* <img src={props.data.user.picture} alt='user profile'/> */}
                    <input 
                        type='file' name='newPicture' accept='image/*' 
                        onChange={() => this.setState({pictureUploaded: true})}
                        onFocus={() => {
                            this.setState({
                                usernameSearchTerm: '',
                                newPassword: ''
                            })
                        }}
                    />
                </label>
                {this.state.pictureUploaded && submitDiv}
            </div>
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
                        onFocus={event => {
                            this.setState({
                                newPassword: '',
                                pictureUploaded: false
                            })
                            event.target.form.newPicture.value = ''
                        }}
                    />
                </label>
                {(!props.data.allUsers.find(user => user.name.toLowerCase() === this.state.usernameSearchTerm.toLowerCase()) &&
                this.state.usernameSearchTerm) &&
                submitDiv}
            </div>
            <div className='changePassword'>
                <label>Change Password: </label>
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
                        onFocus={event => {
                            this.setState({
                                usernameSearchTerm: '',
                                pictureUploaded: false
                            })
                            event.target.form.newPicture.value = ''
                        }}
                        autoComplete='off'
                    />
                </label>
                {this.state.newPassword && submitDiv}
            </div>
        </form>
    )}
}