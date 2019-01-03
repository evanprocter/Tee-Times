import React from 'react';
import './App.css';

export default function LoginPage({history, loginUser, addUser}) {
    return (
        <form className="LoginPage" onSubmit={event => {
            event.preventDefault()
            loginUser(event.target.name.value, event.target.password.value)
            history.push('/')
        }}>
           <label name='name'> 
               Name:
               <input type='text' name='name'/>
               </label>
               <label>
                   Password:
                   <input type='password' name='password' />
               </label>
               <input type='submit' value='login' />
               <input type='button' value='register' onClick={event => {
                   addUser(event.target.form[0].value, event.target.form[1].value)
                   history.push('/')
                   }}/>
                </form>
               )}