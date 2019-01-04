import React from 'react'
import { logoutUser, updateUser, addTeeTime, deleteTeeTime } from './store';

export default function Dashboard(props) {
    return (
        <div className="Dashboard">
            <h1>{props.data.user.name}</h1>
            <div>Here is a list of your current and previous tee times!</div>
            <ul>{props.data.user.teeTimes.map(teeTime => teeTime.date)}</ul>
            <input type="button" value="logout" onClick={event => {
               logoutUser(props.data.user)}}/>
            <input type="button" value="newTeeTime" onClick={event => {
                const newTeeTime = new Date()
                addTeeTime(newTeeTime)
            }}
           />
            <input type="button" value="Remove Tee Time" onClick={event => { 
                deleteTeeTime()
            }}
            />
            <form action="/action_page.php">
            <select name="times">
                <option value="one">8:00 am</option>
                <option value="two">8:10 am</option>
                <option value="three">8:20 am</option>
                <option value="four">8:30 am</option>
                <option value="five">8:40 am</option>
                <option value="six">8:50 am</option>
                <option value="seven">9:00 am</option>
            </select>
            <input type="button" value="Submit"></input>
            </form>
        </div>
    )
}