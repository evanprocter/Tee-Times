import React, {Component} from 'react'
// need stuff for picture manipulation
// import ReactDOM from 'react-dom'
// import Root from './Root';
// import store from './store';

let urls = new WeakMap()

let blobUrl = blob => {
  if (urls.has(blob)) {
    return urls.get(blob)
  } else {
    let url = URL.createObjectURL(blob)
    urls.set(blob, url)
    return url
  }
}

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // keep track of each field with this component
            newPassword: '',
            usernameSearchTerm: '',
            file: null,
            imageLoaded: false,
        }
    }

    render() {
    const {props} = this
    const submitDiv = (
        <div className="submitDiv">
            <label>
                Current password:
                <input
                    type='password' name='currentPassword'
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
                const newUsername = event.target.newUsername.value
                const currentPassword = event.target.currentPassword.value
                const newPassword = event.target.newPassword.value
                const fr = new FileReader()
                fr.onload = () => {
                    const myCanvas = document.getElementById('myCanvas')
                    createImageBitmap(new Blob([fr.result]))
                    .then(myImageBitmap => {

                        const canvasContext = myCanvas.getContext('2d')
                        console.log(myImageBitmap)
                        // draw image takes (img, x, y, w, h)
                        canvasContext.drawImage(myImageBitmap, 0, 0, 40, 40)
                        console.log(canvasContext)
                        myCanvas.toBlob((imageBlob) => {
                            const frBlob = new FileReader()
                            frBlob.onload = () => {
                                // update the user
                                props.updateUser({
                                    _id: props.data.user._id,
                                    name: props.data.user.name,
                                    newUsername,
                                    currentPassword,
                                    newPassword,
                                    newPicture: frBlob.result
                                })
                            }
                            frBlob.readAsBinaryString(imageBlob)
                        }, 'image/png', .5)
                    })
                }
                event.target.newPicture.files[0] ?
                    this.setState({file: event.target.newPicture.files[0]}) :
                    props.updateUser({
                        _id: props.data.user._id,
                        name: props.data.user.name,
                        newUsername,
                        currentPassword,
                        newPassword,
                        newPicture: ''
                    })
                this.setState({
                    newPassword: '',
                    usernameSearchTerm: '',
                    imageLoaded: false,
                })
                event.target.newPicture.value = ''
            }}
            onReset={event => {
                this.setState({newPassword: '', usernameSearchTerm: '', pictureUploaded: false})
                event.target.newPicture.value = ''
            }}
        >
            {/* should change password, username, profile pic */}
            {/* form with inputs labeled with current values*/}
            <div className='changePicture'>
                <label>
                    Change picture:
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
                    <canvas id='myCanvas' ref='myCanvas' width={100} height={100}/>  
                    <img src={this.state.imageLoaded && blobUrl(this.state.file) || props.data.user.pictureSrc} alt='uploaded profile'/>
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
                            })
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
                        type='password' name='newPassword'
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