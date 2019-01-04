import React from 'react'

export default function TeeTimeForm(props) {
    const currentDate= new Date()
    return (
        <form className="TeeTimeForm" onSubmit={event => {
            const teeDate = event.target.teeDate.value
                const newTeeTime = new Date(teeDate)
                props.addTeeTime(newTeeTime)
            }}>
        <input type="date" name="teeDate" id="myDate" defaultValue={currentDate.toLocaleString()}/>

        <select name="times">
                <option value="one">8:00 am</option>
                <option value="two">8:10 am</option>
                <option value="three">8:20 am</option>
                <option value="four">8:30 am</option>
                <option value="five">8:40 am</option>
                <option value="six">8:50 am</option>
                <option value="seven">9:00 am</option>
            </select>
            <input type="submit" value="newTeeTime" 
           />
        </form>
    )
}