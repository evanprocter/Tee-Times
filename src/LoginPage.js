import React from 'react'

export default function LoginPage(props) {
    return (
        // Login Page
        <form className="LoginPage" 
            onSubmit={event => {
                event.preventDefault()
                props.loginUser({
                    name: event.target.name.value, 
                    password: event.target.password.value
                })
            }}
        >
            {/* users login and register */}
            <label value='name' name='name'> 
                <input type='text' name='name' placeholder='name'/>
            </label>
            <label value='password' name='password'>
                <input type='password' name='password' placeholder='password' />
            </label>
            <div className="userLogin">
                <input type='submit' value='login'/>
                <input type='button' value='register' 
                    onClick={event => {
                        if (!props.data.allUsers.map(user => user.name).includes(event.target.form[0].value)) {
                            props.addUser({
                                name: event.target.form[0].value, 
                                password: event.target.form[1].value, 
                                adminPassword: event.target.form[4].value,
                                picture: null, 
                                userType: 'basic'
                            })
                        }
                    }}
                />
            </div>
            {/* admin login section */}
            <div className='adminLogin'>
                <input type='password' placeholder='admin password' name='adminPassword' /> 
                <input type='button' value='register as admin' 
                    onClick={event => {
                        if (!props.data.allUsers.map(user => user.name).includes(event.target.form[0].value)) {
                            props.addUser({
                                name: event.target.form[0].value, 
                                password: event.target.form[1].value, 
                                adminPassword: event.target.form[4].value,
                                picture: null, 
                                userType: 'admin'
                            })
                        }
                    }}
                />
            </div>
        </form>
    )
}