import React from 'react'
import {Switch, Route} from 'react-router-dom'

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <h1 onClick={event => props.history.push('/')}>{`${props.data.user.name}${props.data.user.userType === 'admin' ? ' - admin' : ''}`}</h1>
            <input type="button" value="logout" onClick={event => props.logoutUser(props.data.user)}/>
            <Switch>
                <Route exact path={'/profile'}
                render={() => <button onClick={() => props.history.push('/')}>user dashboard</button>}/>
                <Route path={'/'}
                render={() => <button onClick={() => props.history.push('/profile')}>profile page</button>}/>
            </Switch>
        </div>
    )
}