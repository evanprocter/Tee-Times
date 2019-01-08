import React from 'react';

export default function LoginPage(props) {
    return (
        <form className="LoginPage" 
            onSubmit={event => {
                event.preventDefault()
                props.loginUser(event.target.name.value, event.target.password.value)
                props.history.push('/')
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
                        props.addUser(event.target.form[0].value, event.target.form[1].value, 'basic')
                        props.history.push('/')
                    }
                }}
            />
            <input type='button' value='register as admin' 
                onClick={event => {
                    if (!props.data.allUsers.map(user => user.name).includes(event.target.form[0].value)) {
                        props.addUser(event.target.form[0].value, event.target.form[1].value, 'admin')
                        props.history.push('/')
                    }
                }}
            />
        </form>
    )
}