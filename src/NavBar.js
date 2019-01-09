import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <h1 onClick={event => props.history.push('/')}>{`${props.data.user.name}${props.data.user.userType === 'admin' ? ' - admin' : ''}`}</h1>
            <input type="button" value="logout" onClick={event => props.logoutUser(props.data.user)}/>
            <NavLink className="navlink" to='/teetimes'>Tee Times</NavLink>
            <NavLink className="navlink" to='/friends'>Friends</NavLink>
            {/* <Switch>
                <Route exact path={'/profile'}
                render={() => <button onClick={() => props.history.push('/')}>user dashboard</button>}/>
                <Route path={'/'}
                render={() => <button onClick={() => props.history.push('/profile')}>profile page</button>}/>
            </Switch> */}
        </div>
    )
}