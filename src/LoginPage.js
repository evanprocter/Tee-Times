import React from 'react'

export default function LoginPage(props) {
    return (
        <form className="LoginPage" 
            onSubmit={event => {
                event.preventDefault()
                props.loginUser({
                    name: event.target.name.value, 
                    password: event.target.password.value
                })
            }}
        >
            <label name='name'> 
                Name:
                <input type='text' name='name'/>
            </label>
            <label>
                Password:
                <input type='password' name='password' />
            </label>
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
            <div className='adminLogin'>
                <input type='password' placeholder='password' name='adminPassword' /> 
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